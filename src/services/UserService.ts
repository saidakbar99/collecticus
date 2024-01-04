import $api from "../http"

export default class UserService {
    static fetchUsers() {
        return $api.get('/users')
    }

    // static deleteUsers(selectedIds) {
    //     return $api.post('/delete', { selectedIds })
    // }

    // static blockUsers(selectedIds) {
    //     return $api.post('/block', { selectedIds })
    // }

    // static unblockUsers(selectedIds) {
    //     return $api.post('/unblock', { selectedIds })
    // }
}