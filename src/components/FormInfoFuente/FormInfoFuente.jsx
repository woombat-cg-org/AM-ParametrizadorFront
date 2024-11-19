import { useState } from 'react'
import InfoUno from './InfoUno'
import InfoDos from './InfoDos'

const FormInfoFuente = ({tiempo}) => {

    const tipo_fuente = [
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
                <InfoUno 
                    tipoFuente={tipoFuente}
                />
            )
        }
        {
            tiempo === 2 && (
                <InfoDos />
            )
        }
    </div>
  )
}

export default FormInfoFuente