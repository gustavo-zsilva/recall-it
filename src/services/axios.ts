import axios from "axios"
import { parseCookies } from "nookies"

export function getAPIClient(ctx?: any) {
    const { 'nextauth.token': token, 'nextauth.uid': uid } = parseCookies(ctx)
    
    const api = axios.create({
        baseURL: 'http://localhost:3000/api',
    })

    api.interceptors.request.use(config => {
        config.headers['Authorization'] = token || null
        config.params = { uid }

        return config
    }, err => {
        return Promise.reject(err)
    })

    return api;
}