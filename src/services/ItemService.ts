import $api from "../http"

export interface Item {
    name: string
    tags: string
    collectionId: string
    createdAt: Date
}

export interface FetchedItems extends Item {
    _id: string;
}

export default class ItemService {
    static addItemToCollection(item: Item) {
        return $api.post('/item', { item })
    }
}