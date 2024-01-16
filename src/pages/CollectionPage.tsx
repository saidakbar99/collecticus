import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { formatDistance } from 'date-fns/formatDistance'

import CollectionService, { FetchedCollections } from '@/services/CollectionService'
import ItemDialog from '@/components/ItemDialog'
import { useAppSelector } from '@/hooks/redux'
import ItemsActivityMenu from '@/components/ItemsActivityMenu'
import { FetchedItems } from '@/services/ItemService'

const CollectionPage = () => {
    const location = useLocation()
    const { user } = useAppSelector(state => state.userReducer)

    const [isSelectedAll, setIsSelectedAll] = useState(false)
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [collection, setCollection] = useState<FetchedCollections>({
        _id: '',
        title: '',
        description: '',
        topic: '',
        createdAt: new Date(),
        items: [],
        user: {
            username: '',
            id: '',
            isAdmin: false
        }
    })

    const isOwner = collection.user.id === user.id || user.isAdmin

    const getCollection = async () => {
        try {
            const collectionId = location.pathname.split('/').slice(-1)[0]
            const response = await CollectionService.fetchOneCollection(collectionId)
            setCollection(response.data)
        } catch (e) {
            console.error('Error fetching collections: ', e)
        }
    }

    const handleSelectAll = () => {
        setIsSelectedAll(!isSelectedAll)
        setSelectedItems(collection.items.map((item: FetchedItems) => item._id))

        if (isSelectedAll) {
          setSelectedItems([])
        }
    }

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target
        setSelectedItems([...selectedItems, id])

        if (!checked) {
          setSelectedItems(selectedItems.filter(item => item !== id))
        }
    }

    useEffect(() => {
        getCollection()
    }, [])

    return (
        < >
            <div className='grid grid-cols-2 mt-[72px] p-12'>
                <div>
                    <p className='text-4xl'>{collection?.topic} Collection</p>
                    <p>{collection?.title}</p>
                    <p>{collection?.description}</p>
                    <p>
                        {formatDistance(
                            collection?.createdAt,
                            new Date(),
                            { addSuffix: true }
                        ) }
                    </p>
                    <p>{collection?.user.username}</p>
                    {isOwner && (
                        <ItemDialog outline={false} title='Add' getCollection={getCollection} />
                    )}
                </div>
                <div className=''>
                    <img className='h-auto max-w-full rounded-lg' src='https://placehold.co/600x400' alt='' />
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b">
                    <tr>
                        {isOwner && (
                            <th scope="col" className="px-4 py-3">
                                <input
                                    className="cursor-pointer"
                                    type="checkbox"
                                    checked={ isSelectedAll }
                                    onChange={ handleSelectAll }
                                />
                            </th>
                        )}
                        <th scope="col" className="px-4 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Tags
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Last Update
                        </th>
                        {isOwner && (
                            <th scope="col" className="px-4 py-3">
                                Action
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {collection.items.length ? collection.items.map((item) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item._id}>
                            {isOwner && (
                                <td scope="row" className="px-4 py-3">
                                    <input
                                        className="cursor-pointer"
                                        type="checkbox"
                                        id={item._id}
                                        checked={ selectedItems.includes(item._id) }
                                        onChange={ handleCheckbox }
                                    />
                                </td>
                            )}
                            <td scope="row" className="px-4 py-3">
                                {item.name}
                            </td>
                            <td className="px-4 py-3">
                                {item.tags}
                            </td>
                            <td className="px-4 py-3">
                                {formatDistance(
                                    item?.lastUpdate,
                                    new Date(),
                                    { addSuffix: true }
                                )}
                            </td>
                            {isOwner && (
                                <td className="px-4 py-3">
                                    <ItemDialog outline title='Edit' getCollection={getCollection} itemId={item._id} />
                                </td>
                            )}
                        </tr>
                        )) : (
                            //! refactor
                            <div>no items</div>
                        )
                    }
                </tbody>
            </table>
            <ItemsActivityMenu selectedItems={selectedItems} getCollection={getCollection} collectionId={collection._id} />
        </>
    )
}

export default CollectionPage
