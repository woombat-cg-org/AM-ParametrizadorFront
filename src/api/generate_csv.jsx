import { BASE_PATH } from '../utils/variables'

export async function generateCSVAPI() {
    try {
        const url = `${BASE_PATH}/generar_csv`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}