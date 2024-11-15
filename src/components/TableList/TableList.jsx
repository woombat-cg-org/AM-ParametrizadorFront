import { useState, useEffect } from 'react'
import API from '../../API.json'

const TableList = () => {

    const [fuentes, setFuentes] = useState([])

    useEffect(() => {
        const getData = () =>  {
            try {
                setFuentes(API)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    console.log(fuentes.fuentes)

  return (
    <div className="table_list">
      <div className="table-wrapper">
        <table className="fl-table">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Nombre Fuente</th>
              <th>Creada por</th>
              <th>Editada por</th>
              <th>Ultima Fecha de Modificacion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
                fuentes?.fuentes?.length > 0 ? (
                    fuentes.fuentes.map(item => (
                        <tr key={item.codigo}>
                            <td>{item.codigo}</td>
                            <td>{item.nombre_fuente}</td>
                            <td>{item.creada_por}</td>
                            <td>{item.modificada_por}</td>
                            <td>{item.ultima_modificacion}</td>
                            <td>
                                <span><ion-icon name="create-outline"></ion-icon></span>
                            </td>
                        </tr>
                    ))
                ) : null
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableList;
