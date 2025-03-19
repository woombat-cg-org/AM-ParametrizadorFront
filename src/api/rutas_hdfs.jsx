import { BASE_PATH } from '../utils/variables'

export async function getRutasApi() {
    try {
        const url = `${BASE_PATH}/metadata/rutas`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function deleteRutasApi(id_ruta) {
    try {
        const url = `${BASE_PATH}/metadata/rutas/${id_ruta}`
        const params = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function createRutasApi(data) {
    try {
        const url = `${BASE_PATH}/metadata/rutas`
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function updateRutasByIdApi(id_ruta, data) {
    try {
        const url = `${BASE_PATH}/metadata/rutas/${id_ruta}`
        const params = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getRutaHDFSApi(ruta_hdfs) {
    try {
        const url = `${BASE_PATH}/metadata/rutas/hdfs`
        const params = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ruta_hdfs: ruta_hdfs })
        }
        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getDBApi(nombre_base_datos) {
    try {
        const url = `${BASE_PATH}/metadata/rutas/db`
        const params = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre_base_datos: nombre_base_datos })
        }
        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}