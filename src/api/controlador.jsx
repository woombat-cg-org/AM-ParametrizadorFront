import { BASE_PATH } from '../utils/variables'

export async function getControladorApi() {
    try {
        const url = `${BASE_PATH}/metadata/controlador`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function deleteControladorApi(id_controlador) {
    try {
        const url = `${BASE_PATH}/metadata/controlador/${id_controlador}`
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

export async function createControladorApi(data) {
    try {
        const url = `${BASE_PATH}/metadata/controlador`
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

export async function updateControladorByIdApi(id_controlador, data) {
    try {
        const url = `${BASE_PATH}/metadata/controlador/${id_controlador}`
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