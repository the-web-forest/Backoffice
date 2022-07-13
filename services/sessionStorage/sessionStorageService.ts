export default class SessionStorageService {

    public setItem(name: string, value: string) {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem(name, value)
        }
    }

    public getItem(name: string) {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem(name)
        }
    }

    public removeItem(name: string) {
        if (typeof window !== 'undefined') {
            return sessionStorage.removeItem(name)
        }
    }

}