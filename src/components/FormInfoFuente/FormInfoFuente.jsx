import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import InfoUno from './InfoUno'
import InfoDos from './InfoDos'
import InfoTres from './InfoTres'
import InfoCuatro from './InfoCuatro'

const FormInfoFuente = ({ tiempo, setTiempo, paramFuente, setParamFuente, param_info }) => {

    const navigate = useNavigate()

    const tipos_fuente = [
        {id: 0, name: "-- Seleccione una Opción --", value: ""},
        {id: 1, name: "SQL", value: "SQL"},
        {id: 2, name: "NAS", value: "NAS"},
        {id: 3, name: "HDFS", value: "HDFS"}
    ]

    const [tipoFuente, setTipoFuente] = useState(tipos_fuente)

    // Destructuring
    const { info_fuente } = paramFuente
    const { titulo, palabras_clave, tipo_fuente, id_dependencia, id_subdependencia, id_tema, controlador, cron_tab } = info_fuente

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
            if(!tipo_fuente || !titulo || !palabras_clave || !id_dependencia || !id_subdependencia || !id_tema || !controlador) {
                toast.error('Los campos que tienen * son obligatorios, revisalos nuevamente.')
                return
            }
        } else if (tiempo === 2) {
            if(!cron_tab) {
                toast.error('Los dias y la hora de ejecucion de la fuente son obligatorios.')
                return
            }
        }

        // Logica de Paginacion
        if(tipo === "avanzar") {
            if(tiempo === 4 ) {
                console.log("Otra accion")
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