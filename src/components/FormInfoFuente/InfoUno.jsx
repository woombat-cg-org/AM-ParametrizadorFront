const InfoUno = ({ tipoFuente, paramFuente, setParamFuente }) => {

   // Destructuring
  const { info_fuente } = paramFuente
  const { descripcion, titulo, palabras_clave, base_datos_origen, tabla_origen, ruta_archivo_origen, tipo_fuente, periodicidad, id_dependencia, id_subdependencia, id_tema, tipo_ingesta, controlador, delimitador_archivo, directorio_salida_parquet, directorio_salida_publicacion, flag_encabezado_archivo, flag_anonimizar_campos, flag_aplicar_funciones, flag_particionada, flag_publicacion, flag_activo, id_publicacion, licencia_publicacion } = info_fuente

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
        <label htmlFor="">* Tipo de Fuente</label>
        <select 
          name="tipo_fuente"
          value={tipo_fuente}
          onChange={handleChange}
        >
          {tipoFuente.map((item) => (
            <option 
              value={item.value}
              key={item.id}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Descripción</label>
        <input 
          type="text" 
          name="descripcion"
          value={descripcion}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">* Titulo</label>
        <input 
          type="text" 
          name="titulo"
          value={titulo}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">* Palabras Clave</label>
        <input 
          type="text" 
          name="palabras_clave"
          value={palabras_clave}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Periodicidad</label>
        <select 
          name="periodicidad"
          value={periodicidad}
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
        <label htmlFor="">* ID Dependencia</label>
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
        <label htmlFor="">* ID Subdependencia</label>
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
        <label htmlFor="">* ID Tema</label>
        <select 
          name="id_tema"
          value={id_tema}
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
        <label htmlFor="">Tipo de Ingesta</label>
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
        <label htmlFor="">* Controlador</label>
        <select 
          name="controlador"
          value={controlador}
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
        <label htmlFor="">Base de Datos Origen</label>
        <input 
          type="text" 
          name="base_datos_origen"
          value={base_datos_origen}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Tabla Origen</label>
        <input 
          type="text" 
          name="tabla_origen"
          value={tabla_origen}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Ruta de Archivo Origen</label>
        <input 
          type="text" 
          name="ruta_archivo_origen"
          value={ruta_archivo_origen}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Delimitador Origen</label>
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
        <label htmlFor="">Encabezado Archivo</label>
        <input 
          type="checkbox" 
          name="flag_encabezado_archivo"
          checked={flag_encabezado_archivo}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Directorio Salida del Parquet</label>
        <select 
          name="directorio_salida_parquet"
          value={directorio_salida_parquet}
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
        <label htmlFor="">ID Publicación</label>
        <input 
          type="text" 
          name="id_publicacion"
          value={id_publicacion}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Licencia de Publicación</label>
        <input 
          type="text" 
          name="licencia_publicacion"
          value={licencia_publicacion}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Anonimizar Campos</label>
        <input 
          type="checkbox" 
          name="flag_anonimizar_campos"
          checked={flag_anonimizar_campos}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Aplicar Funciones</label>
        <input 
          type="checkbox" 
          name="flag_aplicar_funciones"
          checked={flag_aplicar_funciones}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Particion</label>
        <input 
          type="checkbox" 
          name="flag_particionada"
          checked={flag_particionada}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Publicación MEData</label>
        <input 
          type="checkbox" 
          name="flag_publicacion"
          checked={flag_publicacion}
          onChange={handleChange}
        />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Salida de los Datos MEData</label>
        <select 
          name="directorio_salida_publicacion"
          value={directorio_salida_publicacion}
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
        <label htmlFor="">Activo</label>
        <input 
          type="checkbox" 
          name="flag_activo"
          checked={flag_activo}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default InfoUno