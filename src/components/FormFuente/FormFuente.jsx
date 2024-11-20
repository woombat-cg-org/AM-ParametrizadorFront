import { useState } from 'react'
import FormNavegacion from '../FormNavegacion/FormNavegacion'
import FormInfoFuente from '../FormInfoFuente/FormInfoFuente'

const FormFuente = () => {

  const [tiempo, setTiempo] = useState(1)

  return (
    <div className="table_list">
        <div className="form_fuente">
            <FormNavegacion 
              tiempo={tiempo}
            />
            <FormInfoFuente 
              tiempo={tiempo}
              setTiempo={setTiempo}
            />
        </div>
    </div>
  )
}

export default FormFuente