import { useState, useEffect } from 'react'
import CardsRutas from "./CardsRutas"
import { getRutasApi, createRutasApi, updateRutasByIdApi, getDBApi, getRutaHDFSApi } from '../../api/rutas_hdfs'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

const DirHDFS = ({ setModal, setConfgNum }) => {
    const [controladores, setControladores] = useState([])
    const [reload, setReload] = useState(false)
    const [editControlador, seteditControlador] = useState(false)
    const [data, setData] = useState({
        nombre_base_datos: "",
        ruta_hdfs: ""
    })

    const { nombre_base_datos, ruta_hdfs } = data

    useEffect(() => {
      const getRutas = async () => {
        const rutas = await getRutasApi()
        setControladores(rutas)
        setReload(false)
      }
      getRutas()
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
            nombre_base_datos: "",
            ruta_hdfs: ""
        })
        seteditControlador(false)
        return
      }

      setModal(false)
      setConfgNum(undefined)
      setData({
        nombre_base_datos: "",
        ruta_hdfs: ""
      })
    }

    const handleGuardar = async () => {
      if(!nombre_base_datos || !ruta_hdfs) {
        toast.error('Los campos que tienen * son obligatorios, revisalos nuevamente.')
        return
      }

      const dataStructure = {
          nombre_base_datos: nombre_base_datos,
          ruta_hdfs: ruta_hdfs,
          id_ruta: editControlador ? data.id_ruta : uuidv4()
      }

      const validateDB = await getDBApi(nombre_base_datos)
      if(validateDB.status) {
        toast.error('La base de datos ya existe, revisa nuevamente.')
        return
      }

      const validateHDFS = await getRutaHDFSApi(ruta_hdfs)
      if(validateHDFS.status) {
        toast.error('La ruta HDFS ya existe, revisa nuevamente.')
        return
      }

      let response

      if(editControlador) {
        response = await updateRutasByIdApi(data.id_ruta, dataStructure)
        if(!response.message === "Controlador actualizado exitosamente") {
          toast.error(response.message)
          return
        }
      } else {
        response = await createRutasApi(dataStructure)
        if(!response.message === "Ruta HDFS creada con éxito") {
          toast.error(response.message)
          return
        }
      }

      toast.success(response.message)

      setReload(true)
      seteditControlador(false)
      setData({
        nombre_base_datos: "",
        ruta_hdfs: ""
      })
    }

  return (
    <div className="conf">
      <div className="conf_sec1">
      <div className="container_campos">
            <div className="container_campos_campo">
                <label htmlFor="nombre_base_datos">* Nombre Base de Datos</label>
                <input 
                    type="text" 
                    autoFocus
                    name="nombre_base_datos"
                    value={nombre_base_datos}
                    onChange={handleChange}
                />
            </div>
            <div className="container_campos_campo">
                <label htmlFor="ruta_hdfs">* Dirección Ruta HDFS</label>
                <input 
                    type="text"
                    name="ruta_hdfs"
                    value={ruta_hdfs}
                    onChange={handleChange}
                />
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
            controladores.slice(1).map((controlador, index) => {
              return <CardsRutas
                  index={index + 1}
                  key={controlador.id_ruta} 
                  setReload={setReload}
                  controlador={controlador}
                  seteditControlador={seteditControlador}
                  setData={setData}
                />
            })
          ) : (
            <p>No se han encontrado rutas hdfs...</p>
          )
        }
      </div>
    </div>
  )
}

export default DirHDFS