import { BASE_PATH } from '../utils/variables'

export async function getFuentesApi() {
    try {
        const url = `${BASE_PATH}/fuentes`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getIdPublicacionApi() {
    try {
        const url = `${BASE_PATH}/fuentes/id_publicacion`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function createFuenteApi(data) {
    try {
        const url = `${BASE_PATH}/fuentes`
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

export async function deleteFuenteApi(id_fuente) {
    try {
        const url = `${BASE_PATH}/fuentes/${id_fuente}`
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

export async function getFuenteByIdApi(id_fuente) {
    try {
        const url = `${BASE_PATH}/fuentes/${id_fuente}`
        const params = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(url, params)
        const result = await response.json()
        return result[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function updateFuenteByIdApi(id_fuente, data) {
    try {
        const url = `${BASE_PATH}/fuentes/${id_fuente}`
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