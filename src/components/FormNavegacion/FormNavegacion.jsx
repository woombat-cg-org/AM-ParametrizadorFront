const FormNavegacion = ({ tiempo = 1 }) => {

    const tiempos = [1, 2, 3, 4]

  return (
    <div className="form_navegacion">
      {tiempos.map((item, index) => (
        <div
          key={index}
          className={`form_navegacion_items ${tiempo === item ? 'form_navegacion_items_active' : ''}`}
        >
          <p>{item}</p>
        </div>
      ))}
    </div>
  )
}

export default FormNavegacion
