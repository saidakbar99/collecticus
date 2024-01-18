import $api from "../http"
import { FetchedItems } from "./ItemService"

export interface Collections {
    title: string
    description: string
    topic: string
    createdAt: Date
    items: FetchedItems[]
    image_url: string
    user: {
        username: string
        _id: string
        isAdmin: boolean
    }
}

export interface FetchedCollections extends Collections {
    _id: string;
}

export default class CollectionService {
    static createCollection(collection: Collections) {
        console.log('>>>service', collection)
        return $api.post('/collection', { collection })
    }

    static fetchAllCollections() {
        return $api.get('/collections')
    }

    static fetchLastCollections() {
        return $api.get('/collections/last')
    }

    static fetchOneCollection(collectionId: string) {
        return $api.get(`/collection/${collectionId}`)
    }

    static fetchUserCollections(userId: string) {
        return $api.get(`/collections/${userId}`)
    }

    static fetchTopCollections() {
        return $api.get(`/collections/top`)
    }

    static deleteCollections(selectedCollections: string[]) {
        return $api.post('/collections/remove', { selectedCollections })
    }
}