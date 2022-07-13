import { NextRouter } from "next/router"
import SESSION_STORAGE_KEYS from "../services/sessionStorage/sessionStorageKeys"
import SessionStorageService from "../services/sessionStorage/sessionStorageService"

const useAuth = (router: NextRouter): void => {
    const sessionStorageService = new SessionStorageService()
    const authToken = sessionStorageService.getItem(SESSION_STORAGE_KEYS.TOKEN)
   
    if(!!authToken == false) {
        router.push('/')
    }
}

export default useAuth