import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import FormNavegacion from '../FormNavegacion/FormNavegacion'
import FormInfoFuente from '../FormInfoFuente/FormInfoFuente'

const FormFuente = () => {

  const [tiempo, setTiempo] = useState(1)

  const param_info = {
    info_fuente: {
      id_fuente: uuidv4(),
      tipo_fuente: '',
      descripcion: '',
      titulo: '',
      palabras_clave: '',
      periodicidad: '',
      id_dependencia: 0,
      id_subdependencia: 0,
      id_tema: 0,
      tipo_ingesta: '',
      controlador: '',
      base_datos_origen: '',
      tabla_origen: '',
      ruta_archivo_origen: '',
      delimitador_archivo: '',
      flag_encabezado_archivo: false,
      directorio_salida_parquet: '',
      flag_anonimizar_campos: false,
      flag_aplicar_funciones: false,
      flag_particionada: false,
      flag_publicacion: false,
      directorio_salida_publicacion: '',
      flag_activo: false,
      cron_tab: '',
      condicion_filtro: '',
      id_publicacion: '',
      licencia_publicacion: ''
    },
    campos: []
  }

  const [paramFuente, setParamFuente] = useState(param_info)

  return (
    <div className="table_list">
        <div className="form_fuente">
            <FormNavegacion 
              tiempo={tiempo}
            />
            <FormInfoFuente
              paramFuente={paramFuente}
              setParamFuente={setParamFuente}
              tiempo={tiempo}
              setTiempo={setTiempo}
              param_info={param_info}
            />
        </div>
    </div>
  )
}

export default FormFuente