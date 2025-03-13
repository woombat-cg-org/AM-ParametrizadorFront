import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Filtro from '../Filtro/Filtro'
import InfoCampos from './InfoCampos'
import PopUp from './PopUp'
import * as XLSX from 'xlsx'
import { toast } from 'react-toastify'

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

    const handleFileUpload = (event) => {
        const file = event.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result)
            const workbook = XLSX.read(data, { type: "array" })

            const sheetName = workbook.SheetNames[0]
            const sheet = workbook.Sheets[sheetName]
            
            // Get headers from the first row
            const range = XLSX.utils.decode_range(sheet['!ref'])
            const headers = []
            for (let C = range.s.c; C <= range.e.c; C++) {
                const cell = sheet[XLSX.utils.encode_cell({ r: 0, c: C })]
                if (cell && cell.v) {
                    headers.push(cell.v.toString().trim())
                }
            }

            // Required headers
            const requiredHeaders = [
                'nombre_campo', 'tipo_dato_origen', 'longitud', 'descripcion_campo',
                'acepta_nulos', 'observaciones', 'alias', 'geometria_tipo_dato',
                'cantidad_elementos', 'descripcion_datos_geograficos', 'sistema_coordenadas',
                'fecha_elaboracion', 'topologia', 'reglas_topologicas', 'excepciones'
            ]

            const missingHeaders = requiredHeaders.filter(header => !headers.includes(header))

            if (missingHeaders.length > 0) {
                toast.error(`Columnas requeridas faltantes: ${missingHeaders.join(', ')}`)
                event.target.value = ''
                return
            }

            const parsedData = XLSX.utils.sheet_to_json(sheet)

            const toBoolean = (value) => {
                if (typeof value === "boolean") return value
                if (typeof value === "string") {
                    return value.trim().toLowerCase() === "true"
                }
                return false
            }

            const maxConsecutivo = paramFuente.campos.length > 0 
                ? paramFuente.campos.reduce((max, item) => (item.consecutivo_campo > max ? item.consecutivo_campo : max), 0) 
                : 0

            const transformedData = parsedData.map((row, index) => ({
                id_fuente: paramFuente.info_fuente.id_fuente,
                consecutivo_campo: maxConsecutivo > 0 ? maxConsecutivo + index + 1 : index + 1,
                acepta_nulos: toBoolean(row["acepta_nulos"]) || false,
                alias: row["alias"] || "",
                cantidad_elementos: Number(row["cantidad_elementos"]) || 0,
                descripcion_campo: row["descripcion_campo"] || "",
                descripcion_datos_geograficos: row["descripcion_datos_geograficos"] || "",
                excepciones: row["excepciones"] || "",
                fecha_elaboracion: row["fecha_elaboracion"] || "",
                flag_anonimizar: false,
                flag_campo_particion: false,
                funcion: "",
                geometria_tipo_dato: row["geometria_tipo_dato"] || "",
                longitud: Number(row["longitud"]) || 0,
                nombre_campo: row["nombre_campo"].toUpperCase() || "",
                observaciones: row["observaciones"] || "",
                reglas_topologicas: row["reglas_topologicas"] || "",
                sistema_coordenadas: row["sistema_coordenadas"] || "",
                tipo_dato_destino: "",
                tipo_dato_origen: row["tipo_dato_origen"],
                topologia: toBoolean(row["topologia"]) || false
            }))

            setParamFuente({
                ...paramFuente,
                campos: [...paramFuente.campos, ...transformedData]
            })
            
            event.target.value = ''
            toast.success('Archivo procesado correctamente')
        }

        reader.readAsArrayBuffer(file)
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
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                    placeholder="Seleccione un archivo Excel"
                />
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