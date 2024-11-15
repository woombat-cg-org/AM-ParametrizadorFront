import { useEffect, useState } from 'react'

const Filtro = ({handleFilterFuente}) => {

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
            placeholder="Buscar Fuente..." 
            type="text"
            onChange={handleBusqueda}
        />
    </div>
  )
}

export default Filtro
