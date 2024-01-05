import $api from "../http"

export default class AuthService {
    static async login(username: string, password: string) {
        return $api.post('/login', { username, password })
    }

    static async registration(username: string, password: string, email: string) {
        return $api.post('/registration', { username, password, email })
    }

    static async logout() {
        return $api.post('/logout')
    }
}