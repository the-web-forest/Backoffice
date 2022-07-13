import SESSION_STORAGE_KEYS from "../services/sessionStorage/sessionStorageKeys"
import SessionStorageService from "../services/sessionStorage/sessionStorageService"

const logout = () => {
    const sessionStorageService = new SessionStorageService()
    sessionStorageService.removeItem(SESSION_STORAGE_KEYS.TOKEN)
    sessionStorageService.removeItem(SESSION_STORAGE_KEYS.USER_NAME)
    sessionStorageService.removeItem(SESSION_STORAGE_KEYS.TOKEN_TYPE)
    window.open('/', '_self')
}

export default logout