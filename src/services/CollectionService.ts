import $api from "../http"

interface Collections {
    title: string
    description: string
    topic: string
    user: string
}

export default class UserService {
    static createCollection(collection: Collections) {
        return $api.post('/collection', { collection })
    }
}