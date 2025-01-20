import { useState, useEffect } from 'react'
import useMetadata from '../../hooks/useMetadata'
import { toast } from 'react-toastify'

const InfoCampos = ({ paramFuente, setParamFuente, datos_campo, setModal, setEditCampo }) => {

    const { metadatos } = useMetadata()

    // Destructuring
    const { info_fuente } = paramFuente
    const { id_fuente } = info_fuente

    const dataCampo = {
        nombre_campo: "",
        tipo_dato_origen: "",
        longitud: 0,
        alias: "",
        tipo_dato_destino: "",
        acepta_nulos: false,
        flag_anonimizar: false,
        flag_campo_particion: false,
        funcion: "",
        descripcion_campo : "",
        observaciones: "",
        geometria_tipo_dato: "",
        cantidad_elementos: 0,
        descripcion_datos_geograficos: "",
        sistema_coordenadas: "",
        fecha_elaboracion: "",
        topologia: "",
        reglas_topologicas: "",
        excepciones: ""
    }
    const [campo, setCampo] = useState(dataCampo)

    useEffect(() => {
        if(datos_campo != undefined) {
            setCampo(datos_campo)
        }
    }, [])

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target
    
        setCampo({
            ...campo,
            [name]: type === "checkbox" ? checked : value
        })
    }

    const handleCancelar = () => {
        setModal(false)
        setCampo(dataCampo)
        setEditCampo(undefined)
    }

    const handleGuardar = () => {
        if(!campo.nombre_campo.trim() || campo.tipo_dato_destino === "" || campo.tipo_dato_origen === "") {
            toast.error('Los campos que tienen * son obligatorios, revisalos nuevamente.')
            return
        }

        if(datos_campo) { 
            const nuevos_campos = paramFuente.campos.map(item => item.consecutivo_campo === datos_campo.consecutivo_campo ? {...item, ...campo, nombre_campo: campo.nombre_campo.toUpperCase()} : item)
            setParamFuente({
                ...paramFuente,
                campos: nuevos_campos
            })
            setModal(false)
            setCampo(dataCampo)
            return
        }

        const maxConsecutivo = paramFuente.campos.length > 0 
            ? paramFuente.campos.reduce((max, item) => (item.consecutivo_campo > max ? item.consecutivo_campo : max), 0) 
            : 0

        setParamFuente({
            ...paramFuente,
            campos: [
                ...paramFuente.campos,
                { ...campo, consecutivo_campo: maxConsecutivo + 1, id_fuente: id_fuente, nombre_campo: campo.nombre_campo.toUpperCase() }
            ]
        })

        setModal(false)
        setCampo(dataCampo)
    }

  return (
    <div className="container_campos">
        <div className="container_campos_campo">
            <label htmlFor="nombre_campo">* Nombre Campo</label>
            <input 
                type="text" 
                autoFocus
                name="nombre_campo"
                value={campo.nombre_campo}
                onChange={handleChange}
            />
        </div>
        <div className="container_campos_campo">
            <label htmlFor="tipo_dato_origen">* Tipo de Dato Origen</label>
            <select 
                name="tipo_dato_origen"
                value={campo.tipo_dato_origen}
                onChange={handleChange}
            >
                {
                    metadatos.tipo_dato_origen.map(item => (
                        <option key={item.id} value={item.value}>{item.name}</option>
                    ))
                }
            </select>
        </div>
        <div className="container_campos_campo">
            <label htmlFor="longitud">Logitud Campo</label>
            <input 
                type="number"
                name="longitud"
                value={campo.longitud}
                onChange={handleChange}
            />
        </div>
        <div className="container_campos_campo">
            <label htmlFor="alias">Alias</label>
            <input 
                type="text"
                name="alias"
                value={campo.alias}
                onChange={handleChange}
            />
        </div>
        <div className="container_campos_campo">
            <label htmlFor="tipo_dato_destino">* Tipo de Dato Destino</label>
            <select 
                name="tipo_dato_destino"
                value={campo.tipo_dato_destino}
                onChange={handleChange}
            >
                {
                    metadatos.tipo_dato_origen.map(item => (
                        <option key={item.id} value={item.value}>{item.name}</option>
                    ))
                }
            </select>
        </div>
        <div className="container_campos_campo">
            <label htmlFor="acepta_nulos">Acepta Nulos</label>
            <input 
                type="checkbox"
                name="acepta_nulos"
                value={campo.acepta_nulos}    
                onChange={handleChange}
            />
        </div>
        {
            paramFuente.info_fuente.flag_anonimizar_campos && (
                <div className="container_campos_campo">
                    <label htmlFor="flag_anonimizar">Anonimizar</label>
                    <input 
                        type="checkbox"
                        name="flag_anonimizar"
                        value={campo.flag_anonimizar}    
                        onChange={handleChange}
                    />
                </div>
            )
        }
        {
            paramFuente.info_fuente.flag_particionada && (
                <div className="container_campos_campo">
                    <label htmlFor="flag_campo_particion">Campo Particion</label>
                    <input 
                        type="checkbox"
                        name="flag_campo_particion"
                        checked={campo.flag_campo_particion}
                        onChange={handleChange}
                    />
                </div>
            )
        }
        {
            paramFuente.info_fuente.flag_aplicar_funciones && (
                <div className="container_campos_campo">
                    <label htmlFor="funcion">Función</label>
                    <textarea 
                        name="funcion"
                        value={campo.funcion}
                        onChange={handleChange}
                    />
                </div>
            )
        }
        <div className="container_campos_campo">
            <label htmlFor="descripcion_campo">Descripción Campo</label>
            <input 
                type="text"
                name="descripcion_campo"
                value={campo.descripcion_campo}
                onChange={handleChange}
            />
        </div>
        <div className="container_campos_campo">
            <label htmlFor="observaciones">Observaciones</label>
            <input 
                type="text"
                name="observaciones"
                value={campo.observaciones}
                onChange={handleChange}
            />
        </div>
        {
            paramFuente.info_fuente.flag_datos_geograficos && (
                <>
                    <div className="container_campos_campo">
                        <label htmlFor="geometria_tipo_dato">Geometria Tipo Dato</label>
                        <select 
                            name="geometria_tipo_dato"
                            value={campo.geometria_tipo_dato}
                            onChange={handleChange}
                        >
                            {
                                metadatos.geometria_tipo_dato.map(item => (
                                    <option key={item.id} value={item.value}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="container_campos_campo">
                        <label htmlFor="cantidad_elementos">Cantidad Elementos</label>
                        <input 
                            type="number"
                            name="cantidad_elementos"
                            value={campo.cantidad_elementos}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="container_campos_campo">
                        <label htmlFor="descripcion_datos_geograficos">Descripcion Datos Geograficos</label>
                        <input 
                            type="text"
                            name="descripcion_datos_geograficos"
                            value={campo.descripcion_datos_geograficos}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="container_campos_campo">
                        <label htmlFor="sistema_coordenadas">Sistema Cordenadas</label>
                        <select 
                            name="sistema_coordenadas"
                            value={campo.sistema_coordenadas}
                            onChange={handleChange}
                        >
                            {
                                metadatos.sistema_coordenadas.map(item => (
                                    <option key={item.id} value={item.value}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="container_campos_campo">
                        <label htmlFor="fecha_elaboracion">Fecha de Elaboracion</label>
                        <input 
                            type="date"
                            name="fecha_elaboracion"
                            value={campo.fecha_elaboracion}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="container_campos_campo">
                        <label htmlFor="topologia">Topologia</label>
                        <select 
                            name="topologia"
                            value={campo.topologia}
                            onChange={handleChange}
                        >
                            {
                                metadatos.topologia.map(item => (
                                    <option key={item.id} value={item.value}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="container_campos_campo">
                        <label htmlFor="reglas_topologicas">Reglas Topologicas</label>
                        <input 
                            type="text"
                            name="reglas_topologicas"
                            value={campo.reglas_topologicas}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="container_campos_campo">
                        <label htmlFor="excepciones">Excepciones</label>
                        <input 
                            type="text"
                            name="excepciones"
                            value={campo.excepciones}
                            onChange={handleChange}
                        />
                    </div>
                </>
            )
        }
        <div className="container_campos_bottons">
            <button
                type="button"
                onClick={() => handleCancelar()}
            >Cancelar</button>
            <button
                type="button"
                onClick={() => handleGuardar()}
            >Guardar</button>
        </div>
    </div>
  )
}

export default InfoCampos