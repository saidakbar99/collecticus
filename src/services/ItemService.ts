import $api from '@/http'
import { FetchedCollections, ExtraFields } from './CollectionService'

export interface Item {
    name: string
    tags: string[]
    lastUpdate: Date
    parentCollection: FetchedCollections,
    extraFields: ExtraFields[]
}

export interface FetchedItems extends Item {
    _id: string
}

export default class ItemService {
    static addItemToCollection(item: Item, collectionId: string) {
        return $api.post('/item', { item, collectionId })
    }

    static editItem(updatedItem: Item, collectionId: string, itemId: string) {
        return $api.patch('/item', { updatedItem, collectionId, itemId })
    }

    static deleteItems(selectedItems: string[], collectionId: string) {
        return $api.delete('/item', { data: { selectedItems, collectionId } })
    }

    static getLastItems() {
        return $api.get('/item/last')
    }

    static getItem(itemId: string) {
        return $api.get(`/item/${itemId}`)
    }

    static search(query: string) {
        return $api.get('/search', { data: { query } })
    }
}