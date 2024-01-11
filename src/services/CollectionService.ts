import $api from "../http"

export interface Collections {
    _id: string
    title: string
    description: string
    topic: string
    user: string
}

export default class CollectionService {
    static createCollection(collection: Collections) {
        return $api.post('/collection', { collection })
    }

    static fetchAllCollections() {
        return $api.get('/collections')
    }

    static fetchOneCollection(collectionId: string) {
        return $api.get(`/collection/${collectionId}`)
    }
}