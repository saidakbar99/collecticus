import $api from '@/http'

export interface User {
    _id: string
    name: string
    email: string
    username: string
    isAdmin: boolean
    isBlocked: boolean
    lastLogin: Date
    createdAt: Date
}

export default class UserService {
    static fetchUsers(token: string) {
        return $api.get('/users', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
    }

    static deleteUsers(selectedIds: string[]) {
        return $api.post('/delete', { selectedIds })
    }

    static blockUsers(selectedIds: string[]) {
        return $api.post('/block', { selectedIds })
    }

    static unblockUsers(selectedIds: string[]) {
        return $api.post('/unblock', { selectedIds })
    }

    static makeAdmin(selectedIds: string[]) {
        return $api.post('/admin', { selectedIds })
    }

    static unmakeAdmin(selectedIds: string[]) {
        return $api.post('/unadmin', { selectedIds })
    }
}