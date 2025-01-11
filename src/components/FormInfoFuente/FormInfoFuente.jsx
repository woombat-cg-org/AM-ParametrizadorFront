import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUser from '../../hooks/useUser'
import { toast } from 'react-toastify'
import InfoUno from './InfoUno'
import InfoDos from './InfoDos'
import InfoTres from './InfoTres'
import InfoCuatro from './InfoCuatro'

const FormInfoFuente = ({ tiempo, setTiempo, paramFuente, setParamFuente, param_info }) => {

    const navigate = useNavigate()
    const { info_user } = useUser()

    const tipos_fuente = [
        {id: 0, name: "-- Seleccione una Opción --", value: ""},
        {id: 1, name: "SQL", value: "SQL"},
        {id: 2, name: "NAS", value: "NAS"},
        {id: 3, name: "HDFS", value: "HDFS"},
        {id: 4, name: "API", value: "API"}
    ]

    const [tipoFuente, setTipoFuente] = useState(tipos_fuente)

    // Destructuring
    const { info_fuente, campos } = paramFuente
    const { nombre_conjunto, tipo_fuente_ingesta, tipo_ingesta, id_dependencia, id_subdependencia, unidad_equipo, descripcion, palabras_clave, id_tematica_mintic, licencia_uso, fecha_inicio_conjunto, fecha_fin_conjunto, frecuencia_actualizacion, directorio_salida_parquet, fuente_datos, ambiente, controlador, base_de_datos, nombre_tabla, esquema, ruta_archivo, nombre_archivo, delimitador_archivo, url_servicio_web, directorio_salida_publicacion, formato_descarga, tipo_conjunto_datos, informacion_contribuye_crecimiento_economico, generacion_valor_agregado, ambito_impacto, informacion_consolidacion_indicadores, demanda_datos, esfuerzo_requerido_publicar, elementos_requeridos_publicar, fuente_datos_priorizacion, calidad_informacion, publicable, cron_tab } = info_fuente

    const handleTiempo = (tipo) => {

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
            if(!nombre_conjunto || !tipo_fuente_ingesta || !tipo_ingesta || !id_dependencia || !id_subdependencia || !unidad_equipo || !descripcion || !palabras_clave || !id_tematica_mintic || !licencia_uso || !fecha_inicio_conjunto || !fecha_fin_conjunto || !frecuencia_actualizacion || !directorio_salida_parquet || !fuente_datos || !ambiente) {
                toast.error('Los campos que tienen * son obligatorios, revisalos nuevamente 3.')
                return
            }

            // InfoUno Validacion Tipo de Fuente Ingesta
            if(tipo_fuente_ingesta === 'SQL') {
                if(!controlador || !base_de_datos || !nombre_tabla || !esquema) {
                    toast.error('Los campos que tienen * son obligatorios, revisalos nuevamente.')
                    return
                }
            } else if(tipo_fuente_ingesta === 'NAS' || tipo_fuente_ingesta === 'HDFS' || tipo_fuente_ingesta === 'API') {
                if(!ruta_archivo || !nombre_archivo || !delimitador_archivo) {
                    toast.error('Los campos que tienen * son obligatorios, revisalos nuevamente.')
                    return
                }
            } else if(tipo_fuente_ingesta === 'API') {
                if(!url_servicio_web) {
                    toast.error('Los campos que tienen * son obligatorios, revisalos nuevamente.')
                    return
                }
            }

            // InfoUno Validacion Informacion Publicable
            if(publicable) {
                if(!directorio_salida_publicacion || !formato_descarga) {
                    toast.error('Los campos que tienen * son obligatorios, revisalos nuevamente.')
                    return
                }
            }

            // InfoUno Validacion Priorizacion
            if(!tipo_conjunto_datos || !informacion_contribuye_crecimiento_economico || !generacion_valor_agregado || !ambito_impacto || !informacion_consolidacion_indicadores || !demanda_datos || !esfuerzo_requerido_publicar || !elementos_requeridos_publicar || !fuente_datos_priorizacion || !calidad_informacion) {
                toast.error('Los campos que tienen * son obligatorios, revisalos nuevamente.')
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
                setParamFuente({
                    ...paramFuente,
                    creado_por: info_user.user,
                    editado_por: info_user.user
                })
                
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