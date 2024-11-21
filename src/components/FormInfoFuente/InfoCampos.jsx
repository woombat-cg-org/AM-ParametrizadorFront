import React from 'react'

const InfoCampos = () => {

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

  return (
    <div className="container_campos">
        <div className="container_campos_campo">
            <label htmlFor="">Nombre Campo</label>
            <input type="text" autoFocus/>
        </div>
        <div className="container_campos_campo">
            <label htmlFor="">Tipo de Dato</label>
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
            <label htmlFor="">Comentarios</label>
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
