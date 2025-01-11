import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Filtro from '../Filtro/Filtro'
import { toast } from 'react-toastify'

import { getFuentesApi, deleteFuenteApi } from '../../api/fuentes'

const TableList = () => {

    const navigate = useNavigate()
    const [refreshData, setRefreshData] = useState(false)
    const [fuentes, setFuentes] = useState(undefined)
    let datoFuente
    if(fuentes === undefined) {
        datoFuente = []
    } else {
        datoFuente = fuentes
    }

    const [copiaFuentes, setCopiaFuentes] = useState(datoFuente)

    useEffect(() => {
        const getData = async () =>  {
            try {
                const response = await getFuentesApi()
                setFuentes(response)
                setCopiaFuentes(response)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
        setRefreshData(false)
    }, [refreshData])

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
        const { codigo } = fuente
        navigate(`/editar-fuente/${codigo}`)
    }    

    const handleDelete = async (fuente) => {
        // ToDo: Peticion DELETE para eliminar la fuente
        const id_fuente = fuente.id_fuente

        try {
            await deleteFuenteApi(id_fuente)
            setRefreshData(true)
            toast.success(`Fuente ${id_fuente} eliminada correctamente`)
        } catch (error) {
            console.log(error)
        }

    }

    const handleNuevaFuente = () => {
        navigate('/nueva-fuente')
    }

    const handleFilterFuente = (fuente) => {
        // eslint-disable-next-line
        const resultFilter = fuentes.filter((fuentes) => {
            if(fuentes.nombre_conjunto.toString().toLowerCase().includes(fuente.toLowerCase())) {
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
                fuentes.length > 0 && <Filtro 
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
                <th>Nombre Fuente</th>
                <th>Tipo Fuente Ingesta</th>
                <th>Ambiente</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    currentItems?.length > 0 && (
                        currentItems.map(item => (
                            <tr key={item.id_fuente}>
                                <td>{item.nombre_conjunto}</td>
                                <td>{item.tipo_fuente_ingesta}</td>
                                <td>{item.ambiente}</td>
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