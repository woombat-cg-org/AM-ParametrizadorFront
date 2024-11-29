import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import API from '../../API.json'
import Filtro from '../Filtro/Filtro'
import InfoCampos from './InfoCampos'

const InfoTable = ({ paramFuente, setParamFuente }) => {

    Modal.setAppElement('#root');

    const [fuentes, setFuentes] = useState(undefined)
    const [modal, setModal] = useState(false)
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
                setFuentes([])
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    const itemsPerPage = 10
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

    const handleDelete = (campo) => {
        const newData = currentItems.filter(item => item.consecutivo !== campo.consecutivo)
        setCopiaFuentes(newData)
    }

    const handleFilterFuente = (fuente) => {
        // eslint-disable-next-line
        const resultFilter = fuentes.filter((fuentes) => {
            if(fuentes.nombre_campo.toString().toLowerCase().includes(fuente.toLowerCase())) {
                return fuentes
            }
        }) 
        setCopiaFuentes(resultFilter)

        handlePageChange(1)
    }

    const customStyles = {
        overlay: {
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '550px',
            maxWidth: '550px',
            minHeight: '600px',
            maxHeight: '600px'
        }
    }

    const handleGuardar = () => {
        setModal(false)
    }

    if(!fuentes) return <h1>Hola</h1>

  return (
    <>
        <div className="info_table_list">
            <div className="info_table_filter">
                {
                    currentItems?.length > 1 && <Filtro 
                        nombre="Buscar Campo..."
                        handleFilterFuente={handleFilterFuente}
                    />
                }
                <button
                    type="button"
                    onClick={() => setModal(true)}
                >Agregar Nuevo Campo</button>
            </div>
            <div className="info-table-wrapper">
                <table className="fl-table">
                <thead>
                    <tr>
                        <th>Consecutivo</th>
                        <th>Nombre Campo</th>
                        <th>Tipo de Dato</th>
                        <th>Logitud</th>
                        <th>Campo Particion</th>
                        <th>Anonimizar</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentItems?.length > 0 && (
                            currentItems.map(item => (
                                <tr key={item.consecutivo}>
                                    <td>{item.consecutivo}</td>
                                    <td>{item.nombre_campo}</td>
                                    <td>{item.tipo_dato}</td>
                                    <td>{item.logitud}</td>
                                    <td>{item.particion}</td>
                                    <td>{item.anonimizar}</td>
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
            <div className="info-table-pages">
                {
                    currentItems.length > 0 && (<p>Total Campos {copiaFuentes.length}</p>)
                }
                <div className="info-table-pages_page">
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
        <Modal
            isOpen={modal}
            style={customStyles}
        >
            <InfoCampos 
                paramFuente={paramFuente}
                setParamFuente={setParamFuente}
            />
            <div className="container_campos_bottons">
                <button
                    type="button"
                    onClick={() => setModal(false)}
                >Cancelar</button>
                <button
                    type="button"
                    onClick={() => handleGuardar()}
                >Guardar</button>
            </div>
        </Modal>
    </>
  )
}

export default InfoTable