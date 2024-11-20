import { useState } from 'react'
import InfoUno from './InfoUno'
import InfoDos from './InfoDos'
import InfoTres from './InfoTres'
import InfoCuatro from './InfoCuatro'

const FormInfoFuente = ({tiempo, setTiempo}) => {

    const tipo_fuente = [
        {id: 0, name: "-- Seleccione una Opción --", value: "none"},
        {id: 1, name: "SQL", value: "SQL"},
        {id: 2, name: "NAS", value: "NAS"},
        {id: 3, name: "HDFS", value: "HDFS"}
    ]

    const [tipoFuente, setTipoFuente] = useState(tipo_fuente)

    const handleTiempo = (tipo) => {
        if(tipo === "avanzar") {
            setTiempo(tiempo + 1)
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
                    >Retroceder</button>
                )
            }
            {
                tiempo < 4 && (
                    <button
                        type="button"
                        onClick={() => handleTiempo("avanzar")}
                    >Avanzar</button>
                )
            }
        </div>
    </div>
  )
}

export default FormInfoFuente