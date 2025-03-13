import { useState, useEffect } from "react"
import { getCamposByAPINiFi } from '../../api/campos'

const PopUp = ({ setModal, paramFuente, setParamFuente, setstateAPI }) => {

    const [state, setstate] = useState([])
    const [camposData, setCampos] = useState([])

    const { campos, info_fuente} = paramFuente

    useEffect(() => {
        const getCampos = async () => {
            const createObj = {
                id_fuente: info_fuente.id_fuente,
                tipo_fuente_ingesta: info_fuente.tipo_fuente_ingesta,
                controlador: info_fuente.controlador,
                delimitador_archivo: info_fuente.delimitador_archivo,
                flag_encabezado_archivo: info_fuente.flag_encabezado_archivo,
                hoja_excel: info_fuente.hoja_excel,
                rango_columnas: info_fuente.rango_columnas,
                flag_excel: info_fuente.flag_excel,
                nombre_conjunto: info_fuente.nombre_conjunto,
                tipo_base_datos: info_fuente.tipo_base_datos,
                base_de_datos: info_fuente.base_de_datos,
                nombre_tabla: info_fuente.nombre_tabla,
                url_servicio_web: info_fuente.url_servicio_Web,
                ruta_archivo: info_fuente.ruta_archivo,
                nombre_archivo: info_fuente.nombre_archivo
            }

            const result = await getCamposByAPINiFi(createObj)
            setstate(result)
        }

        getCampos()
    }, [])

    useEffect(() => {
        const camposExistentes = campos.map((item) => item.nombre_campo.toLowerCase())
    
        const camposCoincidencias = state.filter((item) => 
            camposExistentes.includes(item.nombre_campo.toLowerCase())
        )

        setCampos(camposCoincidencias)
    
      }, [])

    const handleCancelar = () => {
        setModal(false)
        setstateAPI(false)
    }

    const toggleCampo = (item) => {
        if (camposData.includes(item)) {
            setCampos(camposData.filter(campo => campo !== item))
            return
        }

        setCampos([...camposData, item])
    }

    const getButtonClass = (item) => camposData.some(campo => campo.nombre_campo === item.nombre_campo) ? 'popup_item_selected' : 'popup_item'


    const handleGuardar = () => {

        if(info_fuente.tipo_fuente_ingesta === 'API') {
            const camposOrdenados = [...camposData].sort((a, b) => a.id_campo - b.id_campo)
            setCampos(camposOrdenados)
        }

        const maxConsecutivo = paramFuente.campos.length > 0 
            ? paramFuente.campos.reduce((max, item) => (item.consecutivo_campo > max ? item.consecutivo_campo : max), 0) 
            : 0

        if(maxConsecutivo === 0) {
            const camposIterados = camposData.map((campo, index) => ({ 
                ...campo, 
                consecutivo_campo: index + 1, 
                id_fuente: paramFuente.info_fuente.id_fuente, 
                nombre_campo: campo.nombre_campo.toUpperCase(),
                tipo_dato_origen: campo.tipo_dato_origen || "",
                longitud: 10,
                alias: campo.alias || "",
                tipo_dato_destino: campo.tipo_dato_destino || "",
                acepta_nulos: campo.acepta_nulos ?? false,
                flag_anonimizar: campo.flag_anonimizar ?? false,
                flag_campo_particion: campo.flag_campo_particion ?? false,
                funcion: campo.funcion || "",
                descripcion_campo: campo.descripcion_campo || "",
                observaciones: campo.observaciones || "",
                geometria_tipo_dato: campo.geometria_tipo_dato || "",
                cantidad_elementos: campo.cantidad_elementos || 0,
                descripcion_datos_geograficos: campo.descripcion_datos_geograficos || "",
                sistema_coordenadas: campo.sistema_coordenadas || "",
                fecha_elaboracion: campo.fecha_elaboracion || "",
                topologia: campo.topologia ?? false,
                reglas_topologicas: campo.reglas_topologicas || "",
                excepciones: campo.excepciones || ""
            }))

            setParamFuente({
                ...paramFuente,
                campos: [
                    ...paramFuente.campos,
                    ...camposIterados
                ]
            })
        } else {
            const camposIterados = camposData.map((campo, index) => ({ 
                ...campo, 
                consecutivo_campo: maxConsecutivo + index + 1, 
                id_fuente: paramFuente.info_fuente.id_fuente, 
                nombre_campo: campo.nombre_campo.toUpperCase(),
                tipo_dato_origen: campo.tipo_dato_origen || "",
                longitud: 10,
                alias: campo.alias || "",
                tipo_dato_destino: campo.tipo_dato_destino || "",
                acepta_nulos: campo.acepta_nulos ?? false,
                flag_anonimizar: campo.flag_anonimizar ?? false,
                flag_campo_particion: campo.flag_campo_particion ?? false,
                funcion: campo.funcion || "",
                descripcion_campo: campo.descripcion_campo || "",
                observaciones: campo.observaciones || "",
                geometria_tipo_dato: campo.geometria_tipo_dato || "",
                cantidad_elementos: campo.cantidad_elementos || 0,
                descripcion_datos_geograficos: campo.descripcion_datos_geograficos || "",
                sistema_coordenadas: campo.sistema_coordenadas || "",
                fecha_elaboracion: campo.fecha_elaboracion || "",
                topologia: campo.topologia ?? false,
                reglas_topologicas: campo.reglas_topologicas || "",
                excepciones: campo.excepciones || ""
            }))

            setParamFuente({
                ...paramFuente,
                campos: [
                    ...paramFuente.campos,
                    ...camposIterados
                ]
            })
        }

        setModal(false)
        setstateAPI(false)
    }

  return (
    <div className="popup">
        
        {
            state.length > 0 ? (
                <h2>Campos Via API</h2>
            ) : (
                <h2>No hay campos que mostrar</h2>
            )
        }
        {
            state.length > 0 && (
                <p>Selecciona los campos que deseas agregar a la fuente.</p>
            )
        }
        {
            state.length > 0 && (
                state.map((item, index) => (
                    <div 
                        key={index} 
                        className={ getButtonClass(item) }
                        title={`Seleccionando el Campo: ${item.nombre_campo} - ${item.tipo_dato_origen}`} 
                        onClick={() => toggleCampo(item)}>
                        <p><span>Nombre Campo:</span> {item.nombre_campo}</p>
                        <p><span>Tipo de Dato Origen:</span> {item.tipo_dato_origen}</p>
                    </div>
                ))
            )
        }
        <div className="container_campos_bottons">
            <button
                type="button"
                onClick={() => handleCancelar()}
            >Cancelar</button>
            {
                camposData.length > 0 && (
                    <button
                        type="button"
                        onClick={() => handleGuardar()}
                    >Guardar</button>
                )
            }
        </div>
    </div>
  )
}

export default PopUp