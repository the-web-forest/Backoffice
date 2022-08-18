import axios, { AxiosStatic } from "axios";
import Settings from "../../core/settings";
import getAuthToken from "./helpers/getAuthToken";
export default class HttpService {

    private axios: AxiosStatic

    constructor() {
        this.axios = axios
        this.axios.defaults.baseURL = Settings.get().apiUri()
        this.axios.defaults.headers.common['Authorization'] = getAuthToken()
    }

    public post<I>(uri: string, payload: I) {
        return this.axios.post(uri, payload)
    }

    public put<I>(uri: string, payload: I) {
        return this.axios.put(uri, payload)
    }

    public delete<I>(uri: string) {
        return this.axios.delete(uri)
    }

    public get(uri: string, args?: any) {
        return this.axios.get(uri, {
            params: args
        })
    }

}