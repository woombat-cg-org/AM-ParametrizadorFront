import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import FormNavegacion from '../FormNavegacion/FormNavegacion'
import FormInfoFuente from '../FormInfoFuente/FormInfoFuente'

import { getFuenteByIdApi } from '../../api/fuentes'
import { getCamposByIdApi } from '../../api/campos'

const FormFuente =  ({ id }) => {

  const [tiempo, setTiempo] = useState(1)

  let param_info = {
    info_fuente: {
      id_fuente: uuidv4(),
      nombre_conjunto: '',
      tipo_fuente_ingesta: '',
      tipo_ingesta: '',
      cron_tab: '',
      id_dependencia: '',
      id_subdependencia: '',
      unidad_equipo: '',
      descripcion: '',
      palabras_clave: '',
      id_tematica_mintic: '',
      grupo: '',
      licencia_uso: '',
      fecha_inicio_conjunto: '',
      fecha_fin_conjunto: '',
      frecuencia_Actualizacion: '',
      publicable: false,
      flag_anonimizar_campos: false,
      flag_renombrar_campos: false,
      flag_datos_geograficos: false,
      flag_aplicar_funciones: false,
      flag_particionada: false,
      directorio_salida_parquet: '',
      ambito_geografico: '',
      metadatos_geograficos: '',
      diccionario_datos: '',
      catalogo_objetos: '',
      nombre_contacto_proceso: '',
      correo_contacto_proceso: '',
      nombre_contacto_tecnico: '',
      correo_contacto_tecnico: '',
      fuente_datos: '',
      ambiente: '',
      observaciones: '',
      flag_activo: true,
      controlador: '',
      condicion_filtro: '',
      base_de_datos: '',
      nombre_tabla: '',
      esquema: '',
      ruta_archivo: '',
      nombre_archivo: '',
      delimitador_archivo: '',
      flag_encabezado_archivo: false,
      flag_excel: false,
      hoja_excel: '',
      rango_columnas: '',
      url_servicio_Web: '',
      directorio_salida_publicacion: '',
      fecha_publicacion: '',
      id_publicacion: '',
      formato_descarga: '',
      tipo_conjunto_datos: '',
      informacion_contribuye_crecimiento_economico: '',
      generacion_valor_agregado: '',
      ambito_impacto: '',
      informacion_consolidacion_indicadores: '',
      demanda_datos: '',
      esfuerzo_requerido_publicar: '',
      elementos_requeridos_publicar: '',
      fuente_datos_priorizacion: '',
      calidad_informacion: '',
      total_impacto: '',
      total_dificultad: '',
      calculo_total_criterios_evaluacion: ''
    },
    campos: []
  }

  const [paramFuente, setParamFuente] = useState(param_info)

  useEffect(() => {
    const getData = async () =>  {
        try {
            const responseFuente = await getFuenteByIdApi(id)
            const responseCampos = await getCamposByIdApi(id)
            setParamFuente({
              campos: responseCampos,
              info_fuente: {
                ...responseFuente,
                frecuencia_Actualizacion: responseFuente.frecuencia_actualizacion
              }
            })
        } catch (error) {
            console.log(error)
        }
    }
    if(id !== undefined) {
      getData()
    }
  }, [])

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