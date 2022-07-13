import SESSION_STORAGE_KEYS from "../../sessionStorage/sessionStorageKeys"
import SessionStorageService from "../../sessionStorage/sessionStorageService"

const getAuthToken = (): string => {
    const sessionStorageService = new SessionStorageService()
    const tokenType = sessionStorageService.getItem(SESSION_STORAGE_KEYS.TOKEN_TYPE)
    const token = sessionStorageService.getItem(SESSION_STORAGE_KEYS.TOKEN)
    return `${tokenType} ${token}`
}

export default getAuthToken