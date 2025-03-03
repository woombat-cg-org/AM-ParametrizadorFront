import { BASE_PATH } from '../utils/variables'

export async function createCamposApi(data) {
    try {
        const url = `${BASE_PATH}/campos`
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

export async function getCamposByIdApi(id_fuente) {
    try {
        const url = `${BASE_PATH}/fuentes/${id_fuente}/campos`
        const params = {
            method: 'GET',
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

export async function updateCamposByIdApi(id_fuente, data) {
    try {
        const url = `${BASE_PATH}/campos/${id_fuente}`
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

export async function getCamposByAPINiFi (data) {
    try {
        const url = `http://34.30.16.84:7005/`
        const params = {
            method: 'GET',
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
        return []
    }
}