import { BASE_PATH } from '../utils/variables'

export async function getControladorApi() {
    try {
        const url = `${BASE_PATH}/metadata/controlador`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}