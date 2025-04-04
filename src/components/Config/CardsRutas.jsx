import { deleteRutasApi } from '../../api/rutas_hdfs'
import { toast } from 'react-toastify'
import { MdOutlineRestoreFromTrash, MdEdit } from "react-icons/md"

const CardsRutas = ({controlador, setReload, seteditControlador, setData, index}) => {

    const deleteControlador = async (id) => {
        setReload(true)
        const response = await deleteRutasApi(id)

        if(!response.message === "Controlador eliminado exitosamente") {
            toast.error(response.message)
            setReload(false)
            return
        }

        toast.success(response.message)
        setReload(false)
    }

    const editControlador = (controlador) => {
        seteditControlador(true)
        setData({
            nombre_base_datos: controlador.nombre_base_datos,
            ruta_hdfs: controlador.ruta_hdfs,
            id_ruta: controlador.id_ruta
        })
    }

  return (
    <div className="card">
        <div className="card_sec1">
            <p>{index}</p>
        </div>
        <div className="card_sec2">
            <p><span>Nombre Base de Datos:</span> {controlador.nombre_base_datos}</p>
            <p><span>Dirección Ruta HDFS:</span> {controlador.ruta_hdfs}</p>
        </div>
        <div className="card_sec3">
        <span
            onClick={() => editControlador(controlador)}
        ><MdEdit style={{ fontSize: '20px' }}/></span>
        <span
            onClick={() => deleteControlador(controlador.id_ruta)}
        ><MdOutlineRestoreFromTrash style={{ fontSize: '20px' }}/></span>
        </div>
    </div>
  )
}

export default CardsRutas