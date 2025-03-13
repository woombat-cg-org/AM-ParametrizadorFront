import { deleteControladorApi } from '../../api/controlador'
import { toast } from 'react-toastify'

const Cards = ({controlador, setReload, seteditControlador, setData}) => {

    const deleteControlador = async (id) => {
        setReload(true)
        const response = await deleteControladorApi(id)

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
            nombre_controlador: controlador.controlador,
            nombre_servidor: controlador.nombre_servidor,
            ip_servidor: controlador.ip_servidor,
            puerto_servidor: controlador.puerto_servidor.toString(),
            tipo_base_datos: controlador.tipo_base_datos,
            id_controlador: controlador.id_controlador
        })
    }

  return (
    <div className="card">
        <div className="card_sec1">
            <p>{controlador.tipo_base_datos}</p>
        </div>
        <div className="card_sec2">
            <p><span>Nombre Controlador:</span> {controlador.controlador}</p>
            <p><span>Nombre Servidor:</span> {controlador.nombre_servidor}</p>
            <p><span>IP Servidor:</span> {controlador.ip_servidor}</p>
            <p><span>Puerto Servidor:</span> {controlador.puerto_servidor}</p>
        </div>
        <div className="card_sec3">
        <span
            onClick={() => editControlador(controlador)}
        ><ion-icon name="create-outline"></ion-icon></span>
        <span
            onClick={() => deleteControlador(controlador.id_controlador)}
        ><ion-icon name="trash-outline"></ion-icon></span>
        </div>
    </div>
  )
}

export default Cards