const InfoUno = ({tipoFuente}) => {
  return (
    <div className="form_info_fuente_1">
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Tipo Fuente</label>
        <select name="select">
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Descripción</label>
        <input type="text" name="" id="" />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Titulo</label>
        <input type="text" name="" id="" />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Palabras Clave</label>
        <input type="text" name="" id="" />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Periodicidad</label>
        <select name="select">
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">ID Dependencia</label>
        <select name="select">
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">ID Subdependencia</label>
        <select name="select">
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">ID Tema</label>
        <select name="select">
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Tipo Ingesta</label>
        <select name="select">
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Controlador</label>
        <select name="select">
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Base de Datos Origen</label>
        <input type="text" name="" id="" />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Tabla Origen</label>
        <input type="text" name="" id="" />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Ruta Archivo Origen</label>
        <input type="text" name="" id="" />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Delimitador Origen</label>
        <select name="select">
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Encabezado Archivo</label>
        <input type="checkbox" name="" id="" />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Salida del Parquet</label>
        <select name="select">
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Anonimizar Campos</label>
        <input type="checkbox" name="" id="" />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Aplicar Funciones</label>
        <input type="checkbox" name="" id="" />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Particion</label>
        <input type="checkbox" name="" id="" />
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Salida de los Datos</label>
        <select name="select">
          {tipoFuente.map((item) => (
            <option value={item.value} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form_info_fuente_fuente">
        <label htmlFor="">Activo</label>
        <input type="checkbox" name="" id="" />
      </div>
    </div>
  );
};

export default InfoUno
