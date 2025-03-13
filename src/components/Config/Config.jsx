import { useState, useEffect } from 'react'
import Cards from "./Cards"
import { getControladorApi, createControladorApi, updateControladorByIdApi } from '../../api/controlador'
import useMetadata from '../../hooks/useMetadata'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

const Config = ({ setModal }) => {

    const { metadatos } = useMetadata()

    const [controladores, setControladores] = useState([])
    const [reload, setReload] = useState(false)
    const [editControlador, seteditControlador] = useState(false)
    const [data, setData] = useState({
        nombre_controlador: "",
        nombre_servidor: "",
        ip_servidor: "",
        puerto_servidor: "",
        tipo_base_datos: ""
    })

    const { nombre_controlador, nombre_servidor, ip_servidor, puerto_servidor, tipo_base_datos } = data

    useEffect(() => {
      const getControladores = async () => {
        const controladores = await getControladorApi()
        setControladores(controladores)
        setReload(false)
      }
      getControladores()
    }, [reload])

    const handleChange = (e) => {

      const { name, value } = e.target
  
      setData({
          ...data,
          [name]: value
      })
    }

    const handleCancelar = () => {
      if(editControlador) {
        setData({
          nombre_controlador: "",
          nombre_servidor: "",
          ip_servidor: "",
          puerto_servidor: "",
          tipo_base_datos: ""
        })
        seteditControlador(false)
        return
      }

      setModal(false)
      setData({
        nombre_controlador: "",
        nombre_servidor: "",
        ip_servidor: "",
        puerto_servidor: "",
        tipo_base_datos: ""
      })
    }

    const handleGuardar = async () => {
      if(!nombre_controlador || !nombre_servidor || !ip_servidor || !puerto_servidor || !tipo_base_datos) {
        toast.error('Los campos que tienen * son obligatorios, revisalos nuevamente.')
        return
      }

      const dataStructure = {
          controlador: nombre_controlador,
          nombre_servidor: nombre_servidor,
          ip_servidor: ip_servidor,
          puerto_servidor: Number(puerto_servidor),
          tipo_base_datos: tipo_base_datos,
          id_controlador: editControlador ? data.id_controlador : uuidv4()
      }

      let response

      if(editControlador) {
        response = await updateControladorByIdApi(data.id_controlador, dataStructure)
        if(!response.message === "Controlador actualizado exitosamente") {
          toast.error(response.message)
          return
        }
      } else {
        response = await createControladorApi(dataStructure)
        if(!response.message === "Controlador creado con éxito") {
          toast.error(response.message)
          return
        }
      }

      toast.success(response.message)

      setReload(true)
      seteditControlador(false)
      setData({
        nombre_controlador: "",
        nombre_servidor: "",
        ip_servidor: "",
        puerto_servidor: "",
        tipo_base_datos: ""
      })
    }

  return (
    <div className="conf">
      <div className="conf_sec1">
        <div className="container_campos">
            <div className="container_campos_campo">
                <label htmlFor="nombre_controlador">* Nombre Controlador</label>
                <input 
                    type="text" 
                    autoFocus
                    name="nombre_controlador"
                    value={nombre_controlador}
                    onChange={handleChange}
                />
            </div>
            <div className="container_campos_campo">
                <label htmlFor="nombre_servidor">* Nombre Servidor</label>
                <input 
                    type="text"
                    name="nombre_servidor"
                    value={nombre_servidor}
                    onChange={handleChange}
                />
            </div>
            <div className="container_campos_campo">
                <label htmlFor="ip_servidor">* IP Servidor</label>
                <input 
                    type="text" 
                    name="ip_servidor"
                    value={ip_servidor}
                    onChange={handleChange}
                />
            </div>
            <div className="container_campos_campo">
                <label htmlFor="puerto_servidor">* Puerto Servidor</label>
                <input 
                    type="number" 
                    name="puerto_servidor"
                    value={puerto_servidor}
                    onChange={handleChange}
                />
            </div>
            <div className="container_campos_campo">
                <label htmlFor="tipo_base_datos">* Tipo Bases de Datos</label>
                <select 
                    name="tipo_base_datos"
                    value={tipo_base_datos}
                    onChange={handleChange}
                >
                    {
                        metadatos.tipos_db.map(item => (
                            <option key={item.id} value={item.value}>{item.name}</option>
                        ))
                    }
                </select>
            </div>
        </div>
        <div className="card_bottons">
            <button
                type="button"
                onClick={() => handleGuardar()}
            >Guardar</button>
            {
              editControlador ? (
                <button
                  type="button"
                  onClick={() => handleCancelar()}
                >Cancelar Edición</button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleCancelar()}
                >Cerrar</button>
              )
            }
        </div>
      </div>
      <div className="conf_sec2">
        {
          controladores.length > 0 ? (
            controladores.slice(1).map(controlador => {
              return <Cards
                  key={controlador.id_controlador} 
                  setReload={setReload} 
                  controlador={controlador}
                  seteditControlador={seteditControlador}
                  setData={setData}
                />
            })
          ) : (
            <p>No se han encontrado controladores...</p>
          )
        }
      </div>
    </div>
  )
}

export default Config
