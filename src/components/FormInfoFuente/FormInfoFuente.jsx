import { useState } from 'react'
import { toast } from 'react-toastify'
import InfoUno from './InfoUno'
import InfoDos from './InfoDos'
import InfoTres from './InfoTres'
import InfoCuatro from './InfoCuatro'

const FormInfoFuente = ({tiempo, setTiempo, paramFuente, setParamFuente}) => {

    const tipos_fuente = [
        {id: 0, name: "-- Seleccione una Opción --", value: "none"},
        {id: 1, name: "SQL", value: "SQL"},
        {id: 2, name: "NAS", value: "NAS"},
        {id: 3, name: "HDFS", value: "HDFS"}
    ]

    const [tipoFuente, setTipoFuente] = useState(tipos_fuente)

    const { info_fuente } = paramFuente
    const { descripcion, titulo, palabras_clave, base_datos_origen, tabla_origen, ruta_archivo_origen, tipo_fuente, periodicidad, id_dependencia, id_subdependencia, id_tema, tipo_ingesta, controlador, delimitador_archivo, directorio_salida_parquet, directorio_salida_publicacion, flag_encabezado_archivo, flag_anonimizar_campos, flag_aplicar_funciones, flag_particionada, flag_publicacion, flag_activo } = info_fuente

    const handleTiempo = (tipo) => {
        
        if(!tipo_fuente || !titulo || !palabras_clave || !periodicidad) {
            console.log('Error')
            toast.error('Heeey! Te faltan campos por llenar...')
            return
        }

        if(tipo === "avanzar") {
            if(tiempo === 4 ) {
                console.log("Otra accion")
            } else {
                setTiempo(tiempo + 1)
            }
        } else if(tipo === "retroceder") {
            setTiempo(tiempo - 1)
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
                    <InfoDos />
                </>
            )
        }
        {
            tiempo === 3 && (
                <>
                    <h2>Campos Fuente</h2>
                    <InfoTres />
                </>
            )
        }
        {
            tiempo === 4 && (
                <>
                    <h2>Información General Fuente</h2>
                    <InfoCuatro />
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