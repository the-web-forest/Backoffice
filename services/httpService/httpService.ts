import axios, { Axios, AxiosStatic } from "axios";
import Settings from "../../core/settings";
import SESSION_STORAGE_KEYS from "../sessionStorage/sessionStorageKeys";
import SessionStorageService from "../sessionStorage/sessionStorageService";
import getAuthToken from "./helpers/getAuthToken";

export default class HttpService {

    private axios: AxiosStatic

    constructor() {
        this.axios = axios
        this.axios.defaults.baseURL = Settings.baseApiUrl
        this.axios.defaults.headers.common['Authorization'] = getAuthToken()
    }

    public post<I>(uri: string, payload: I) {
        return this.axios.post(uri, payload)
    }

    public get(uri: string, args?: any) {
        return this.axios.get(uri, {
            params: args
        })
    }

}