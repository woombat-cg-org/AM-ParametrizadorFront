const InfoUno = ({ tipoFuente, paramFuente, setParamFuente }) => {

   // Destructuring
  const { info_fuente } = paramFuente
  const { nombre_conjunto, tipo_fuente_ingesta, tipo_ingesta, id_dependencia, id_subdependencia, unidad_equipo, descripcion, palabras_clave, id_tematica_mintic, grupo, licencia_uso, fecha_inicio_conjunto, fecha_fin_conjunto, frecuencia_Actualizacion, publicable, flag_anonimizar_campos, flag_renombrar_campos, flag_aplicar_funciones, flag_particionada, directorio_salida_parquet, ambito_geografico, metadatos_geograficos, diccionario_datos, catalogo_objetos, nombre_contacto_proceso, correo_contacto_proceso, nombre_contacto_tecnico, correo_contacto_tecnico, fuente_datos, ambiente, observaciones, flag_activo, controlador, base_de_datos, nombre_tabla, esquema, ruta_archivo, nombre_archivo, delimitador_archivo, flag_encabezado_archivo, hoja_excel, rango_columnas, url_servicio_Web, directorio_salida_publicacion, fecha_publicacion, formato_descarga, tipo_conjunto_datos, informacion_contribuye_crecimiento_economico, generacion_valor_agregado, ambito_impacto, informacion_consolidacion_indicadores, demanda_datos, esfuerzo_requerido_publicar, elementos_requeridos_publicar, fuente_datos_priorizacion, calidad_informacion, flag_excel } = info_fuente

  // Funcion para Tomar los datos del Formulario
  const handleChange = (e) => {

    const { name, value, type, checked } = e.target

    setParamFuente({
      ...paramFuente,
      info_fuente: {
        ...paramFuente.info_fuente,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }

  return (
    <div className="form_info_fuente_1">
      <div className="form_info_fuente_fuente">
        <label htmlFor="nombre_conjunto">* Titulo de la Fuente de Datos</label>
        <input 
          type="text" 
          name="nombre_conjunto"
          value={nombre_conjunto}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="tipo_fuente_ingesta">* Tipo de Fuente</label>
        <select 
          name="tipo_fuente_ingesta"
          value={tipo_fuente_ingesta}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="tipo_ingesta">* Tipo de Ingesta</label>
        <select 
          name="tipo_ingesta"
          value={tipo_ingesta}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="id_dependencia">* ID Dependencia</label>
        <select 
          name="id_dependencia"
          value={id_dependencia}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="id_subdependencia">* ID Subdependencia</label>
        <select 
          name="id_subdependencia"
          value={id_subdependencia}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="unidad_equipo">* Nombre del Equipo o Unidad Responsable</label>
        <input 
          type="text" 
          name="unidad_equipo"
          value={unidad_equipo}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="descripcion">* Descripcion</label>
        <input 
          type="text" 
          name="descripcion"
          value={descripcion}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="palabras_clave">* Palabras Clave Asociadas a la Funete</label>
        <input 
          type="text" 
          name="palabras_clave"
          value={palabras_clave}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="id_tematica_mintic">* Tematica MinTIC</label>
        <select 
          name="id_tematica_mintic"
          value={id_tematica_mintic}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="grupo">Grupo Tematica MinTIC</label>
        <select 
          name="grupo"
          value={grupo}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="licencia_uso">* Licencia de Uso</label>
        <select 
          name="licencia_uso"
          value={licencia_uso}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="fecha_inicio_conjunto">* Fecha Inicial de los Registros Publicados</label>
        <input 
          type="date" 
          name="fecha_inicio_conjunto"
          value={fecha_inicio_conjunto}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="fecha_fin_conjunto">* Fecha Final de los Registros Publicados</label>
        <input 
          type="date" 
          name="fecha_fin_conjunto"
          value={fecha_fin_conjunto}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="frecuencia_Actualizacion">* Frecuencia de Actualizacion de los Datos</label>
        <select 
          name="frecuencia_Actualizacion"
          value={frecuencia_Actualizacion}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="publicable">Publicacion en MEData</label>
        <input 
          type="checkbox" 
          name="publicable"
          checked={publicable}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="flag_anonimizar_campos">Anonimizar Campos</label>
        <input 
          type="checkbox" 
          name="flag_anonimizar_campos"
          checked={flag_anonimizar_campos}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="flag_renombrar_campos">Renombrar Campos</label>
        <input 
          type="checkbox" 
          name="flag_renombrar_campos"
          checked={flag_renombrar_campos}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="flag_aplicar_funciones">Aplicar Funciones</label>
        <input 
          type="checkbox" 
          name="flag_aplicar_funciones"
          checked={flag_aplicar_funciones}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="flag_particionada">Fuente Particionada</label>
        <input 
          type="checkbox" 
          name="flag_particionada"
          checked={flag_particionada}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="directorio_salida_parquet">* Ruta Salida del Parquet en HDFS</label>
        <input 
          type="text" 
          name="directorio_salida_parquet"
          checked={directorio_salida_parquet}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="ambito_geografico">Ambito Geografico</label>
        <select 
          name="ambito_geografico"
          value={ambito_geografico}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="metadatos_geograficos">Metadatos Geografico</label>
        <select 
          name="metadatos_geograficos"
          value={metadatos_geograficos}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="diccionario_datos">Formato Diccionario de Datos</label>
        <select 
          name="diccionario_datos"
          value={diccionario_datos}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="catalogo_objetos">Catalogo de Objetos</label>
        <select 
          name="catalogo_objetos"
          value={catalogo_objetos}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="nombre_contacto_proceso">Nombre Contacto Proceso</label>
        <input 
          type="text" 
          name="nombre_contacto_proceso"
          checked={nombre_contacto_proceso}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="correo_contacto_proceso">Correo Contacto Proceso</label>
        <input 
          type="text" 
          name="correo_contacto_proceso"
          checked={correo_contacto_proceso}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="nombre_contacto_tecnico">Nombre Contacto Tecnico</label>
        <input 
          type="text" 
          name="nombre_contacto_tecnico"
          checked={nombre_contacto_tecnico}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="correo_contacto_tecnico">Correo Contacto Tecnico</label>
        <input 
          type="text" 
          name="correo_contacto_tecnico"
          checked={correo_contacto_tecnico}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="fuente_datos">* Origen de los Datos</label>
        <select 
          name="fuente_datos"
          value={fuente_datos}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="ambiente">* Ambiente</label>
        <select 
          name="ambiente"
          value={ambiente}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="observaciones">Observaciones</label>
        <input 
          type="text" 
          name="observaciones"
          checked={observaciones}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="flag_activo">Fuente Activa</label>
        <input 
          type="checkbox" 
          name="flag_activo"
          checked={flag_activo}
          onChange={handleChange}
        />
      </div>
      {
        tipo_fuente_ingesta === "SQL" && (
          <>
            <div className="form_info_fuente_fuente">
              <label htmlFor="controlador">* Controlador</label>
              <input 
                type="text" 
                name="controlador"
                checked={controlador}
                onChange={handleChange}
              />
            </div>
            <div className="form_info_fuente_fuente">
              <label htmlFor="base_de_datos">* Nombre de la Base de Datos Origen</label>
              <input 
                type="text" 
                name="base_de_datos"
                checked={base_de_datos}
                onChange={handleChange}
              />
            </div>
            <div className="form_info_fuente_fuente">
              <label htmlFor="nombre_tabla">* Nombre de la Tabla de Datos Origen</label>
              <input 
                type="text" 
                name="nombre_tabla"
                checked={nombre_tabla}
                onChange={handleChange}
              />
            </div>
            <div className="form_info_fuente_fuente">
              <label htmlFor="esquema">* Nombre del Esquema de Datos Origen</label>
              <input 
                type="text" 
                name="esquema"
                checked={esquema}
                onChange={handleChange}
              />
            </div>
          </>
        )
      }
      {
        tipo_fuente_ingesta === "NAS" || tipo_fuente_ingesta === "HDFS" || tipo_fuente_ingesta === "API" && (
          <>
            <div className="form_info_fuente_fuente">
              <label htmlFor="ruta_archivo">* Ruta del Archivo</label>
              <input 
                type="text" 
                name="ruta_archivo"
                checked={ruta_archivo}
                onChange={handleChange}
              />
            </div>
            <div className="form_info_fuente_fuente">
              <label htmlFor="nombre_archivo">* Nombre del Archivo</label>
              <input 
                type="text" 
                name="nombre_archivo"
                checked={nombre_archivo}
                onChange={handleChange}
              />
            </div>
            <div className="form_info_fuente_fuente">
              <label htmlFor="delimitador_archivo">* Delimitador del Archivo</label>
              <select 
                name="delimitador_archivo"
                value={delimitador_archivo}
                onChange={handleChange}
              >
                {tipoFuente.map((item) => (
                  <option value={item.value} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form_info_fuente_fuente">
              <label htmlFor="flag_encabezado_archivo">Encabezado del Archivo</label>
              <input 
                type="checkbox" 
                name="flag_encabezado_archivo"
                checked={flag_encabezado_archivo}
                onChange={handleChange}
              />
            </div>
            <div className="form_info_fuente_fuente">
              <label htmlFor="flag_excel">Archivo Excel</label>
              <input 
                type="checkbox" 
                name="flag_excel"
                checked={flag_excel}
                onChange={handleChange}
              />
            </div>
            <div className="form_info_fuente_fuente">
              <label htmlFor="hoja_excel">Hoja Excel</label>
              <input 
                type="text" 
                name="hoja_excel"
                checked={hoja_excel}
                onChange={handleChange}
              />
            </div>
            <div className="form_info_fuente_fuente">
              <label htmlFor="rango_columnas">Rango Columnas Excel</label>
              <input 
                type="text" 
                name="rango_columnas"
                checked={rango_columnas}
                onChange={handleChange}
              />
            </div>
          </>
        )
      }
      {
        tipo_fuente_ingesta === "API" && (
          <>
            <div className="form_info_fuente_fuente">
              <label htmlFor="url_servicio_Web">* URL Servicio Web</label>
              <input 
                type="text" 
                name="url_servicio_Web"
                checked={url_servicio_Web}
                onChange={handleChange}
              />
            </div>
          </>
        )
      }
      {
        publicable && (
          <>
            <div className="form_info_fuente_fuente">
              <label htmlFor="directorio_salida_publicacion">* Directorio Salida Publicacion</label>
              <input 
                type="text" 
                name="directorio_salida_publicacion"
                checked={directorio_salida_publicacion}
                onChange={handleChange}
              />
            </div>
            <div className="form_info_fuente_fuente">
              <label htmlFor="fecha_publicacion">Fecha Publicacion MEData</label>
              <input 
                type="date" 
                name="fecha_publicacion"
                value={fecha_publicacion}
                onChange={handleChange}
              />
            </div>
            <div className="form_info_fuente_fuente">
              <label htmlFor="formato_descarga">* Formato de Descarga</label>
              <select 
                name="formato_descarga"
                value={formato_descarga}
                onChange={handleChange}
              >
                {tipoFuente.map((item) => (
                  <option value={item.value} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )
      }
      <div className="form_info_fuente_fuente">
        <label htmlFor="tipo_conjunto_datos">* Tipo Conjunto de Datos</label>
        <select 
          name="tipo_conjunto_datos"
          value={tipo_conjunto_datos}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="informacion_contribuye_crecimiento_economico">* Informacion Crecimiento Economico</label>
        <select 
          name="informacion_contribuye_crecimiento_economico"
          value={informacion_contribuye_crecimiento_economico}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="generacion_valor_agregado">* Generacion Valor Agregado</label>
        <select 
          name="generacion_valor_agregado"
          value={generacion_valor_agregado}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="ambito_impacto">* Ambito de Impacto</label>
        <select 
          name="ambito_impacto"
          value={ambito_impacto}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="informacion_consolidacion_indicadores">* Informacion Consolidacion Indicadores</label>
        <select 
          name="informacion_consolidacion_indicadores"
          value={informacion_consolidacion_indicadores}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="demanda_datos">* Demanda de Datos</label>
        <select 
          name="demanda_datos"
          value={demanda_datos}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="esfuerzo_requerido_publicar">* Esfuerzo Requerido Publicar</label>
        <select 
          name="esfuerzo_requerido_publicar"
          value={esfuerzo_requerido_publicar}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="elementos_requeridos_publicar">* Elementos Requeridos Publicar</label>
        <select 
          name="elementos_requeridos_publicar"
          value={elementos_requeridos_publicar}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="fuente_datos_priorizacion">* Fuente de Datos Priorizacion</label>
        <select 
          name="fuente_datos_priorizacion"
          value={fuente_datos_priorizacion}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="calidad_informacion">* Calidad de la Informacion</label>
        <select 
          name="calidad_informacion"
          value={calidad_informacion}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default InfoUno