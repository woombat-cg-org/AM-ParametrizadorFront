import { BASE_PATH } from '../utils/variables'

export async function registerApi(formData) {
    try {
        const url = `${BASE_PATH}/nuevo-usuario`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }

        const response = await fetch(url, params)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function loginApi(formData) {
    try {
        const url = `${BASE_PATH}/iniciar-sesion`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }

        const response = await fetch(url, params)
        const result = await response.json()
        return result     
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function existingUserApi(formData) {
    try {
        const url = `${BASE_PATH}/validar-usuario`
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }

        const response = await fetch(url, params)
        const result = await response.json()
        return result     
    } catch (error) {
        console.log(error)
        return null
    }
}