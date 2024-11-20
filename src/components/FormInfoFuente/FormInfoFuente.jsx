import { useState } from 'react'
import InfoUno from './InfoUno'
import InfoDos from './InfoDos'
import InfoTres from './InfoTres'
import InfoCuatro from './InfoCuatro'

const FormInfoFuente = ({tiempo}) => {

    const tipo_fuente = [
        {id: 0, name: "-- Seleccione una Opción --", value: "none"},
        {id: 1, name: "SQL", value: "SQL"},
        {id: 2, name: "NAS", value: "NAS"},
        {id: 3, name: "HDFS", value: "HDFS"}
    ]

    const [tipoFuente, setTipoFuente] = useState(tipo_fuente)

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
                <InfoDos />
            )
        }
        {
            tiempo === 3 && (
                <InfoTres />
            )
        }
        {
            tiempo === 4 && (
                <InfoCuatro />
            )
        }
        <div className="form_info_fuente_buttons">
            <button
                type="button"
            >Retroceder</button>
            <button
                type="button"
            >Avanzar</button>
        </div>
    </div>
  )
}

export default FormInfoFuente