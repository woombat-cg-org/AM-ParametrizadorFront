import React from 'react'
import InfoTable from './InfoTable'

const InfoTres = ({ paramFuente, setParamFuente }) => {
  return (
    <div className="form_info_fuente_3">
      <InfoTable 
        paramFuente={paramFuente}
        setParamFuente={setParamFuente}
      />
    </div>
  )
}

export default InfoTres