import { useEffect, useState } from 'react'

const Filtro = ({handleFilterFuente, nombre = "Buscar Fuente..."}) => {

    const [busqueda, setbusqueda] = useState('')

    const handleBusqueda = (e) => {
        setbusqueda(e.target.value)
    }

    useEffect(() => {
        handleFilterFuente(busqueda)
    }, [busqueda])

  return (
    <div className="filtro_buscar">
        <input 
            placeholder={nombre}
            type="text"
            onChange={handleBusqueda}
        />
    </div>
  )
}

export default Filtro
