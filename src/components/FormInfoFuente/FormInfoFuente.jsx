import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import { toast } from 'react-toastify'
import InfoUno from './InfoUno'
import InfoDos from './InfoDos'
import InfoTres from './InfoTres'
import InfoCuatro from './InfoCuatro'

import { existingUserApi } from '../../api/user'
import { createFuenteApi, getIdPublicacionApi, updateFuenteByIdApi } from '../../api/fuentes'
import { createCamposApi, updateCamposByIdApi } from '../../api/campos'
import { generateCSVAPI } from '../../api/generate_csv'

const FormInfoFuente = ({ tiempo, setTiempo, paramFuente, setParamFuente, param_info }) => {

    const { id } = useParams()

    const navigate = useNavigate()
    const { info_user, logout } = useUser()

    const tipos_fuente = [
        {id: 0, name: "-- Seleccione una Opción --", value: ""},
        {id: 1, name: "SQL", value: "SQL"},
        {id: 2, name: "NAS", value: "NAS"},
        {id: 3, name: "HDFS", value: "HDFS"},
        {id: 4, name: "API", value: "API"}
    ]

    const [tipoFuente, setTipoFuente] = useState(tipos_fuente)
    const [modal, setModal] = useState(false)

    // Destructuring
    const { info_fuente, campos } = paramFuente
    const { nombre_conjunto, tipo_fuente_ingesta, tipo_ingesta, id_dependencia, id_subdependencia, unidad_equipo, descripcion, palabras_clave, id_tematica_mintic, licencia_uso, fecha_inicio_conjunto, fecha_fin_conjunto, frecuencia_Actualizacion, directorio_salida_parquet, fuente_datos, ambiente, controlador, base_de_datos, nombre_tabla, esquema, ruta_archivo, nombre_archivo, delimitador_archivo, url_servicio_web, directorio_salida_publicacion, formato_descarga, tipo_conjunto_datos, informacion_contribuye_crecimiento_economico, generacion_valor_agregado, ambito_impacto, informacion_consolidacion_indicadores, demanda_datos, esfuerzo_requerido_publicar, elementos_requeridos_publicar, fuente_datos_priorizacion, calidad_informacion, publicable, cron_tab } = info_fuente

    const handleTiempo = async (tipo) => {

        // Cancelar la Creacion o Edicion de Fuente
        if(tipo === "cancelar") {
            setParamFuente(param_info)
            setTiempo(1)
            navigate('/')
            return
        }

        if(tipo === "retroceder") {
            setTiempo(tiempo - 1)
            return
        }
        
        if(tiempo === 1) {
            // InfoUno Validacion de Datos
            if(!nombre_conjunto || !tipo_fuente_ingesta || !tipo_ingesta || !id_dependencia || !unidad_equipo || !descripcion || !palabras_clave || !id_tematica_mintic || !licencia_uso || !fecha_inicio_conjunto || !fecha_fin_conjunto || !frecuencia_Actualizacion || !directorio_salida_parquet || !fuente_datos || !ambiente) {
                console.log(nombre_conjunto, tipo_fuente_ingesta, tipo_ingesta, id_dependencia, unidad_equipo, descripcion, palabras_clave, id_tematica_mintic, licencia_uso, fecha_inicio_conjunto, fecha_fin_conjunto, frecuencia_Actualizacion, directorio_salida_parquet, fuente_datos, ambiente);
                toast.error('Los campos que tienen * son obligatorios, revisalos nuevamente. 1')
                return
            }

            // InfoUno Validacion Tipo de Fuente Ingesta
            if(tipo_fuente_ingesta === 'SQL') {
                if(!controlador || !base_de_datos || !nombre_tabla || !esquema) {
                    toast.error('Los campos que tienen * son obligatorios, revisalos nuevamente. 2')
                    return
                }
            } else if(tipo_fuente_ingesta === 'NAS' || tipo_fuente_ingesta === 'HDFS' || tipo_fuente_ingesta === 'API') {
                if(!ruta_archivo || !nombre_archivo || !delimitador_archivo) {
                    toast.error('Los campos que tienen * son obligatorios, revisalos nuevamente. 3')
                    return
                }
            } else if(tipo_fuente_ingesta === 'WEBSERVICE') {
                if(!url_servicio_web) {
                    toast.error('Los campos que tienen * son obligatorios, revisalos nuevamente. 4')
                    return
                }
            }

            // InfoUno Validacion Informacion Publicable
            if(publicable) {
                if(!directorio_salida_publicacion || !formato_descarga) {
                    toast.error('Los campos que tienen * son obligatorios, revisalos nuevamente. 5')
                    return
                }
            }

            // InfoUno Validacion Priorizacion
            if(!tipo_conjunto_datos || !informacion_contribuye_crecimiento_economico || !generacion_valor_agregado || !ambito_impacto || !informacion_consolidacion_indicadores || !demanda_datos || !esfuerzo_requerido_publicar || !elementos_requeridos_publicar || !fuente_datos_priorizacion || !calidad_informacion) {
                toast.error('Los campos que tienen * son obligatorios, revisalos nuevamente. 6')
                return
            }

        } else if (tiempo === 2) {
            if(!cron_tab) {
                toast.error('Es necesario tener un crontab para poder avanzar.')
                return
            }
        } else if (tiempo === 3) {
           if(campos.length === 0) {
            toast.error('Debe existir al menos una columna para poder avanzar.')
            return
           }
        }

        // Logica de Paginacion
        if(tipo === "avanzar") {
            if(tiempo === 4 ) {

                // Guardar datos
                setModal(true)

                // Validar existencia de usuario auth
                const userData = {
                    username: info_user.user
                }
                const response = await existingUserApi(userData)
                if(!response.message) {
                    toast.error('No se pudo validar el usuario, por favor vuelva a iniciar sesion.')
                    logout()
                    setParamFuente(param_info)
                    setModal(false)
                    return
                }

                // Obtener el id publicacion maximo
                function formatNumberWithLeadingZeros(num, totalLength) {
                    return num.toString().padStart(totalLength, '0')
                }

                const responseId = await getIdPublicacionApi()
                if(responseId === null) {
                    toast.info("Ha ocurrido un error al obtener el id_publicacion.")
                    return
                }
                const nuevoId = Number(responseId) + 1
                const id_total_final = formatNumberWithLeadingZeros(nuevoId, 6)
                
                // Guardar Datos de la Fuente
                // Ordenar la Metadata de la Fuente para enviarla al backend
                const sourceMapData = {
                    id_fuente: paramFuente.info_fuente.id_fuente,
                    nombre_conjunto: paramFuente.info_fuente.nombre_conjunto,
                    tipo_fuente_ingesta: paramFuente.info_fuente.tipo_fuente_ingesta,
                    tipo_ingesta: paramFuente.info_fuente.tipo_ingesta,
                    cron_tab: paramFuente.info_fuente.cron_tab,
                    id_dependencia: paramFuente.info_fuente.id_dependencia,
                    id_subdependencia: paramFuente.info_fuente.id_subdependencia,
                    unidad_equipo: paramFuente.info_fuente.unidad_equipo,
                    descripcion: paramFuente.info_fuente.descripcion,
                    palabras_clave: paramFuente.info_fuente.palabras_clave,
                    id_tematica_mintic: paramFuente.info_fuente.id_tematica_mintic,
                    grupo: paramFuente.info_fuente.grupo,
                    licencia_uso: paramFuente.info_fuente.licencia_uso,
                    fecha_inicio_conjunto: paramFuente.info_fuente.fecha_inicio_conjunto,
                    fecha_fin_conjunto: paramFuente.info_fuente.fecha_fin_conjunto,
                    frecuencia_actualizacion: paramFuente.info_fuente.frecuencia_Actualizacion,
                    publicable: paramFuente.info_fuente.publicable,
                    flag_anonimizar_campos: paramFuente.info_fuente.flag_anonimizar_campos,
                    flag_renombrar_campos: paramFuente.info_fuente.flag_renombrar_campos,
                    flag_datos_geograficos: paramFuente.info_fuente.flag_datos_geograficos,
                    flag_aplicar_funciones: paramFuente.info_fuente.flag_aplicar_funciones,
                    flag_particionada: paramFuente.info_fuente.flag_particionada,
                    directorio_salida_parquet: paramFuente.info_fuente.directorio_salida_parquet,
                    ambito_geografico: paramFuente.info_fuente.ambito_geografico,
                    metadatos_geograficos: paramFuente.info_fuente.metadatos_geograficos,
                    diccionario_datos: paramFuente.info_fuente.diccionario_datos,
                    catalogo_objetos: paramFuente.info_fuente.catalogo_objetos,
                    nombre_contacto_proceso: paramFuente.info_fuente.nombre_contacto_proceso,
                    correo_contacto_proceso: paramFuente.info_fuente.correo_contacto_proceso,
                    correo_contacto_tecnico: paramFuente.info_fuente.correo_contacto_tecnico,
                    nombre_contacto_tecnico: paramFuente.info_fuente.nombre_contacto_tecnico,
                    fuente_datos: paramFuente.info_fuente.fuente_datos,
                    ambiente: paramFuente.info_fuente.ambiente,
                    observaciones: paramFuente.info_fuente.observaciones,
                    flag_activo: paramFuente.info_fuente.flag_activo,
                    controlador: paramFuente.info_fuente.controlador,
                    condicion_filtro: paramFuente.info_fuente.condicion_filtro,
                    base_de_datos: paramFuente.info_fuente.base_de_datos,
                    nombre_tabla: paramFuente.info_fuente.nombre_tabla,
                    esquema: paramFuente.info_fuente.esquema,
                    ruta_archivo: paramFuente.info_fuente.ruta_archivo,
                    nombre_archivo: paramFuente.info_fuente.nombre_archivo,
                    delimitador_archivo: paramFuente.info_fuente.delimitador_archivo,
                    flag_encabezado_archivo: paramFuente.info_fuente.flag_encabezado_archivo,
                    flag_excel: paramFuente.info_fuente.flag_excel,
                    hoja_excel: paramFuente.info_fuente.hoja_excel,
                    rango_columnas: paramFuente.info_fuente.rango_columnas,
                    url_servicio_web: paramFuente.info_fuente.url_servicio_Web,
                    directorio_salida_publicacion: paramFuente.info_fuente.directorio_salida_publicacion,
                    fecha_publicacion: paramFuente.info_fuente.fecha_publicacion,
                    id_publicacion: publicable ? `1-0${paramFuente.info_fuente.id_dependencia}-${paramFuente.info_fuente.id_tematica_mintic}-${id_total_final}` : "",
                    formato_descarga: paramFuente.info_fuente.formato_descarga,
                    tipo_conjunto_datos: paramFuente.info_fuente.tipo_conjunto_datos,
                    informacion_contribuye_crecimiento_economico: paramFuente.info_fuente.informacion_contribuye_crecimiento_economico,
                    generacion_valor_agregado: paramFuente.info_fuente.generacion_valor_agregado,
                    ambito_impacto: paramFuente.info_fuente.ambito_impacto,
                    informacion_consolidacion_indicadores: paramFuente.info_fuente.informacion_consolidacion_indicadores,
                    demanda_datos: paramFuente.info_fuente.demanda_datos,
                    esfuerzo_requerido_publicar: paramFuente.info_fuente.esfuerzo_requerido_publicar,
                    elementos_requeridos_publicar: paramFuente.info_fuente.elementos_requeridos_publicar,
                    fuente_datos_priorizacion: paramFuente.info_fuente.fuente_datos_priorizacion,
                    calidad_informacion: paramFuente.info_fuente.calidad_informacion,
                    total_impacto: parseFloat((
                        Number(paramFuente.info_fuente.informacion_contribuye_crecimiento_economico) +
                        Number(paramFuente.info_fuente.generacion_valor_agregado) +
                        Number(paramFuente.info_fuente.ambito_impacto) +
                        Number(paramFuente.info_fuente.informacion_consolidacion_indicadores) +
                        Number(paramFuente.info_fuente.informacion_consolidacion_indicadores)
                      ) * 4 / 5).toFixed(3),
                    total_dificultad: parseFloat((
                        Number(paramFuente.info_fuente.esfuerzo_requerido_publicar) +
                        Number(paramFuente.info_fuente.elementos_requeridos_publicar) +
                        Number(paramFuente.info_fuente.fuente_datos_priorizacion) +
                        Number(paramFuente.info_fuente.calidad_informacion)
                      ) * 5 / 4).toFixed(3),
                    calculo_total_criterios_evaluacion: (() => {
                        const totalImpacto = parseFloat((
                          Number(paramFuente.info_fuente.informacion_contribuye_crecimiento_economico) +
                          Number(paramFuente.info_fuente.generacion_valor_agregado) +
                          Number(paramFuente.info_fuente.ambito_impacto) +
                          Number(paramFuente.info_fuente.informacion_consolidacion_indicadores) +
                          Number(paramFuente.info_fuente.informacion_consolidacion_indicadores)
                        ) * 4 / 5).toFixed(3);
                    
                        const totalDificultad = parseFloat((
                          Number(paramFuente.info_fuente.esfuerzo_requerido_publicar) +
                          Number(paramFuente.info_fuente.elementos_requeridos_publicar) +
                          Number(paramFuente.info_fuente.fuente_datos_priorizacion) +
                          Number(paramFuente.info_fuente.calidad_informacion)
                        ) * 5 / 4).toFixed(3);
                    
                        if (totalImpacto > 2) {
                          return totalDificultad > 2 ? "Victoria Temprana" : "Mediano Plazo"
                        } else {
                          return totalDificultad > 2 ? "Largo Plazo" : "No aporta valor"
                        }
                      })()
                }

                let sourceResponse

                if(id) {
                    sourceResponse = await updateFuenteByIdApi(id, sourceMapData)
                    if(sourceResponse.message === "La fuente no existe.") {
                        toast.error(sourceResponse.message)
                        return
                    } else if(sourceResponse.message === "Error al actualizar la fuente.") {
                        toast.error(sourceResponse.message)
                        return
                    }

                    toast.success(sourceResponse.message)
                } else {
                    sourceResponse = await createFuenteApi(sourceMapData)
                    if(sourceResponse.message === "La fuente ya existe.") {
                        toast.error(sourceResponse.message)
                        return
                    } else if(sourceResponse.message === "Error al crear la fuente.") {
                        toast.error(sourceResponse.message)
                        return
                    }

                    toast.success(sourceResponse.message)
                }

                // Guardar Campos de la Fuente
                const dataCampos = paramFuente.campos.map((item) => ({
                    id_fuente: item.id_fuente,
                    consecutivo_campo: item.consecutivo_campo,
                    nombre_campo: item.nombre_campo,
                    tipo_dato_origen: item.tipo_dato_origen,
                    longitud: item.longitud,
                    alias: item.alias,
                    tipo_dato_destino: item.tipo_dato_destino,
                    acepta_nulos: item.acepta_nulos,
                    flag_anonimizar: item.flag_anonimizar,
                    flag_campo_particion: item.flag_campo_particion,
                    funcion: item.funcion,
                    descripcion_campo: item.descripcion_campo,
                    observaciones: item.observaciones,
                    geometria_tipo_dato: item.geometria_tipo_dato,
                    cantidad_elementos: item.cantidad_elementos,
                    descripcion_datos_geograficos: item.descripcion_datos_geograficos,
                    sistema_coordenadas: item.sistema_coordenadas,
                    fecha_elaboracion: item.fecha_elaboracion,
                    topologia: item.topologia,
                    reglas_topologicas: item.reglas_topologicas,
                    excepciones: item.excepciones
                }))

                let camposResponse
                if(id) {
                    camposResponse = await updateCamposByIdApi(id, dataCampos)
                    if(camposResponse.message === "Error al actualizar los campos.") {
                        toast.error(camposResponse.message)
                        return
                    } 

                    toast.success(camposResponse.message)

                    
                    if(camposResponse.message !== "Campos actualizados exitosamente." && sourceResponse.message !== "Fuente actualizada exitosamente.") {
                        toast.error("Ha ocurrido un error al guardar la informacion de la fuente.")
                        return
                    }
                } else {
                    camposResponse = await createCamposApi(dataCampos)
                    if(camposResponse.message === "Error al crear los campos.") {
                        toast.error(camposResponse.message)
                        return
                    } 

                    toast.success(camposResponse.message)

                    if(camposResponse.message !== "Campos creados con éxito." && sourceResponse.message !== "Fuente creada con éxito.") {
                        toast.error("Ha ocurrido un error al guardar la informacion de la fuente.")
                        return
                    }
                }

                const gen_csv = await generateCSVAPI()

                if(gen_csv.status === "error") {
                    toast.error(gen_csv.message)
                    setModal(false)
                    return
                }

                if(gen_csv.status === "success") {
                    toast.success(gen_csv.message)
                }

                setModal(false)
                navigate('/')
                setParamFuente(param_info)
                setTiempo(1)

            } else {
                setTiempo(tiempo + 1)
            }
        }

    }

    if(tipoFuente === undefined) return (<h1> Cargando</h1>)

  return (
    <div className="form_info_fuente">
        {
            tiempo === 1 && (
                <>
                    <h2>Información Fuente</h2>
                    <InfoUno 
                        paramFuente={paramFuente}
                        setParamFuente={setParamFuente}
                        tipoFuente={tipoFuente}
                    />
                </>
                
            )
        }
        {
            tiempo === 2 && (
                <>
                    <h2>Ejecución Fuente</h2>
                    <InfoDos 
                        paramFuente={paramFuente}
                        setParamFuente={setParamFuente}
                    />
                </>
            )
        }
        {
            tiempo === 3 && (
                <>
                    <h2>Campos Fuente</h2>
                    <InfoTres 
                        paramFuente={paramFuente}
                        setParamFuente={setParamFuente}
                    />
                </>
            )
        }
        {
            tiempo === 4 && (
                <>
                    <h2>Información General Fuente</h2>
                    <InfoCuatro 
                        paramFuente={paramFuente}
                        modal={modal}
                    />
                </>
            )
        }
        <div className="form_info_fuente_buttons">
            {
                tiempo >= 2 && (
                    <button
                        type="button"
                        onClick={() => handleTiempo("retroceder")}
                    >Volver</button>
                )
            }
            {
                tiempo == 1 && (
                    <button
                        type="button"
                        onClick={() => handleTiempo("cancelar")}
                    >Cancelar</button>
                )
            }
            {
                tiempo <= 4 && (
                    <button
                        type="button"
                        onClick={() => handleTiempo("avanzar")}
                    >Guardar</button>
                )
            }
        </div>
    </div>
  )
}

export default FormInfoFuente