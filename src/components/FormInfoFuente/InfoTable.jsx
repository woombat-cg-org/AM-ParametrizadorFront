import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Filtro from '../Filtro/Filtro'
import InfoCampos from './InfoCampos'
import PopUp from './PopUp'

const InfoTable = ({ paramFuente, setParamFuente }) => {

    Modal.setAppElement('#root')

    const { campos } = paramFuente
    const [fuentes, setFuentes] = useState(undefined)
    const [editCampo, setEditCampo] = useState(undefined)
    const [stateAPI, setstateAPI] = useState(false)
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
                setFuentes(campos)
                setCopiaFuentes(campos)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [campos])

    const itemsPerPage = 10
    const totalPages = Math.ceil(copiaFuentes.length / itemsPerPage)
    const [currentPage, setCurrentPage] = useState(1)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentItems = copiaFuentes.slice(startIndex, endIndex)

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
    }

    const handleEdit = (columna) => {
        setModal(true)
        setEditCampo(columna)
    }

    const handleDelete = (campo) => {
        const newData = currentItems.filter(item => item.consecutivo_campo !== campo.consecutivo_campo)
        setParamFuente({
            ...paramFuente,
            campos: newData
        })
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

    const handleCamposAPI = () => {
        setModal(true)
        setstateAPI(true)
    }

    if(!fuentes) return <h1>Hola</h1>
    
  return (
    <>
        <div className="info_table_list">
            <div className="info_table_filter">
                {
                    currentItems?.length >= 1 && <Filtro 
                        nombre="Buscar Campo..."
                        handleFilterFuente={handleFilterFuente}
                    />
                }
                
                <div className="info_table_filter_boton">
                {
                    paramFuente.info_fuente.tipo_fuente_ingesta === ('SQL' || 'NAS') && (
                        <button
                            type="button"
                            onClick={() => setModal(true)}
                        >Agregar Nuevo Campo</button>
                    )
                }
                {
                    paramFuente.info_fuente.tipo_fuente_ingesta === ('SQL' || 'NAS' || 'WEBSERVICE') && (
                        <button
                            type="button"
                            onClick={() => handleCamposAPI()}
                        >Campos via API</button>
                    )
                }
                </div>
            </div>
            <div className="info-table-wrapper">
                <table className="fl-table">
                <thead>
                    <tr>
                        <th>Consecutivo</th>
                        <th>Nombre Campo</th>
                        <th>Tipo de Dato Destino</th>
                        <th>Longitud</th>
                        <th>Campo Particion</th>
                        <th>Anonimizar</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentItems?.length > 0 && (
                            currentItems.map(item => (
                                <tr key={item.consecutivo_campo}>
                                    <td>{item.consecutivo_campo}</td>
                                    <td>{item.nombre_campo}</td>
                                    <td>{item.tipo_dato_destino}</td>
                                    <td>{item.longitud}</td>
                                    <td>{`${item.flag_campo_particion ? "X" : ""}`}</td>
                                    <td>{`${item.flag_anonimizar ? "X" : ""}`}</td>
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
            {
                stateAPI ? (
                    <PopUp 
                        setModal={setModal}
                        paramFuente={paramFuente}
                        setstateAPI={setstateAPI}
                        setParamFuente={setParamFuente}
                    />
                ) : (
                    <InfoCampos 
                        paramFuente={paramFuente}
                        setParamFuente={setParamFuente}
                        setModal={setModal}
                        datos_campo={editCampo}
                        setEditCampo={setEditCampo}
                    />
                )
            }
        </Modal>
    </>
  )
}

export default InfoTable