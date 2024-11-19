import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../API.json'
import Filtro from '../Filtro/Filtro'

const TableList = () => {

    const navigate = useNavigate()
    const [fuentes, setFuentes] = useState(undefined)
    let datoFuente
    if(fuentes === undefined) {
        datoFuente = []
    } else {
        datoFuente = fuentes
    }

    const [copiaFuentes, setCopiaFuentes] = useState(datoFuente)

    useEffect(() => {
        const getData = () =>  {
            try {
                setFuentes(API)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    const itemsPerPage = 20
    const totalPages = Math.ceil(copiaFuentes.length / itemsPerPage)
    const [currentPage, setCurrentPage] = useState(1)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentItems = copiaFuentes.slice(startIndex, endIndex)

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
    }

    const handleEdit = (fuente) => {
        console.log(fuente)
    }

    const handleDelete = (fuente) => {
        console.log(fuente)
    }

    const handleNuevaFuente = () => {
        navigate('/nueva-fuente')
    }

    const handleFilterFuente = (fuente) => {
        // eslint-disable-next-line
        const resultFilter = fuentes.fuentes.filter((fuentes) => {
            if(fuentes.nombre_fuente.toString().toLowerCase().includes(fuente.toLowerCase())) {
                return fuentes
            }
        }) 
        setCopiaFuentes(resultFilter)

        handlePageChange(1)
    }

    if(!fuentes) return <h1>Hola</h1>

  return (
    <div className="table_list">
        <div className="table_filter">
            {
                fuentes && <Filtro 
                    handleFilterFuente={handleFilterFuente}
                />
            }
            <button
                type="button"
                onClick={() => handleNuevaFuente()}
            >Agregar Nueva Fuente</button>
        </div>
        <div className="table-wrapper">
            <table className="fl-table">
            <thead>
                <tr>
                <th>Codigo</th>
                <th>Nombre Fuente</th>
                <th>Ultima Fecha de Modificacion</th>
                <th>Editada por</th>
                <th>Creada por</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    currentItems?.length > 0 && (
                        currentItems.map(item => (
                            <tr key={item.codigo}>
                                <td>{item.codigo}</td>
                                <td>{item.nombre_fuente}</td>
                                <td>{item.ultima_modificacion}</td>
                                <td>{item.modificada_por}</td>
                                <td>{item.creada_por}</td>
                                <td>
                                    <span
                                        onClick={() => handleEdit({...item})}
                                    ><ion-icon name="create-outline"></ion-icon></span>
                                    <span
                                        onClick={() => handleDelete({...item})}
                                    ><ion-icon name="trash-outline"></ion-icon></span>
                                </td>
                            </tr>
                        ))
                    )
                }
            </tbody>
            </table>
        </div>
        <div className="table-pages">
            {
                currentItems.length > 0 && (<p>Total Fuentes {copiaFuentes.length}</p>)
            }
            <div className="table-pages_page">
                {
                    Array.from({ length: totalPages }, (_, index) => (
                        <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </button>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default TableList