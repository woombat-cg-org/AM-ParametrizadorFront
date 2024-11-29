import { useState } from 'react'

const InfoCampos = ({ paramFuente, setParamFuente }) => {

    const tipos_dato = [
        {
            id: 0,
            tipo_dato: "STRING"
        },
        {
            id: 1,
            tipo_dato: "INT"
        },
        {
            id: 2,
            tipo_dato: "FLOAT"
        },
        {
            id: 3,
            tipo_dato: "TIMESTAMP"
        }
    ]

    // Destructuring
    const { campos } = paramFuente

    const dataCampo = {
        nombre_campo: "",
        tipo_dato_origen: "",
        longitud: 0,
        descripcion: "",
        flag_campo_particion: false,
        flag_aplicar_funcion: false,
        flag_anonimizar: false,
        funcion: "",
        tipo_dato_destino: "",
        comentarios: ""
    }
    const [campo, setCampo] = useState()

  return (
    <div className="container_campos">
        <div className="container_campos_campo">
            <label htmlFor="">Nombre Campo</label>
            <input type="text" autoFocus/>
        </div>
        <div className="container_campos_campo">
            <label htmlFor="">Comentarios</label>
            <input type="text"/>
        </div>
        <div className="container_campos_campo">
            <label htmlFor="">Tipo de Dato Origen</label>
            <select name="">
                {
                    tipos_dato.map(item => (
                        <option key={item.id}>{item.tipo_dato}</option>
                    ))
                }
            </select>
        </div>
        <div className="container_campos_campo">
            <label htmlFor="">Tipo de Dato Destino</label>
            <select name="">
                {
                    tipos_dato.map(item => (
                        <option key={item.id}>{item.tipo_dato}</option>
                    ))
                }
            </select>
        </div>
        <div className="container_campos_campo">
            <label htmlFor="">Logitud Campo</label>
            <input type="number"/>
        </div>
        <div className="container_campos_campo">
            <label htmlFor="">Campo Particion</label>
            <input type="checkbox"/>
        </div>
        <div className="container_campos_campo">
            <label htmlFor="">Anonimizar</label>
            <input type="checkbox"/>
        </div>
        <div className="container_campos_campo">
            <label htmlFor="">Descripción</label>
            <input type="text"/>
        </div>
        <div className="container_campos_campo">
            <label htmlFor="">Función</label>
            <textarea />
        </div>
    </div>
  )
}

export default InfoCampos
