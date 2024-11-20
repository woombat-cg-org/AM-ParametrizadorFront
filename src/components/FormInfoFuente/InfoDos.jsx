const InfoDos = () => {
  return (
    <div className="form_info_fuente_2">
      <div className="form_info_fuente_time">
        <label htmlFor="">Dia Ejecucion</label>
        <div className="form_info_fuente_time_days">
          <input type="button" value="Lunes" />
          <input type="button" value="Martes" />
          <input type="button" value="Miercoles" />
          <input type="button" value="Jueves" />
          <input type="button" value="Viernes" />
          <input type="button" value="Sabado" />
          <input type="button" value="Domingo" />
        </div>
      </div>
      <div className="form_info_fuente_time">
        <label htmlFor="">Hora Ejecución</label>
          <input type="time" />
      </div>
      <div className="form_info_fuente_time">
        <label htmlFor="">Condición Filtro</label>
          <textarea rows="4" cols="50" placeholder="WHERE"></textarea>
      </div>
    </div>
  )
}

export default InfoDos