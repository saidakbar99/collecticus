import $api from "../http"

export interface Collections {
    title: string
    description: string
    topic: string
    user: {
        username: string
        id: string
        isAdmin: boolean
    }
}

export default class CollectionService {
    static createCollection(collection: Collections) {
        return $api.post('/collection', { collection })
    }

    static fetchAllCollections() {
        return $api.get('/collections')
    }

    static fetchLastCollections() {
        return $api.get('/collections-last')
    }

    static fetchOneCollection(collectionId: string) {
        return $api.get(`/collection/${collectionId}`)
    }
}