import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { formatDistance } from 'date-fns/formatDistance'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import CollectionService, { FetchedCollections } from '@/services/CollectionService'
import ItemDialog from '@/components/ItemDialog'
import { useAppSelector } from '@/hooks/redux'
import ItemsActivityMenu from '@/components/ItemsActivityMenu'
import ItemService, { FetchedItems } from '@/services/ItemService'
import { IMAGE_PLACEHOLDER } from '@/config/config'

const CollectionPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { user } = useAppSelector(state => state.userReducer)

    const [isSelectedAll, setIsSelectedAll] = useState(false)
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [collection, setCollection] = useState<FetchedCollections>()

    const getCollection = async () => {
        try {
            const collectionId = location.pathname.split('/').slice(-1)[0]
            const response = await CollectionService.fetchOneCollection(collectionId)
            setCollection(response.data)
        } catch (e) {
            console.error('Error fetching collections: ', e)
        }
    }

    useEffect(() => {
        getCollection()
    }, [])

    if (!collection) {
        return <div></div>
    }

    const isOwner = collection.user._id === user.id || user.isAdmin

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

    return (
        <div>
            <div className='grid grid-cols-2 px-12'>
                <div>
                    <p className='text-4xl'>{collection?.title}</p>
                    <p>{collection?.topic} Collection</p>
                    <Markdown remarkPlugins={[remarkGfm]}>{collection?.description}</Markdown>
                    <p>
                        {formatDistance(
                            collection?.createdAt,
                            new Date(),
                            { addSuffix: true }
                        )}
                    </p>
                    <p>{collection?.user.username}</p>
                    {isOwner && (
                        <ItemDialog title='Add' getCollection={getCollection} collection={{...collection, items: []}} />
                    )}
                </div>
                <img
                    className='h-72 rounded-lg'
                    src={collection.image_url || IMAGE_PLACEHOLDER}
                    alt='collectionImage'
                />
            </div>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 border mt-8'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b'>
                    <tr>
                        {isOwner && (
                            <th scope='col' className='px-4 py-3'>
                                <input
                                    className='cursor-pointer'
                                    type='checkbox'
                                    checked={ isSelectedAll }
                                    onChange={ handleSelectAll }
                                    disabled={!collection.items.length}
                                />
                            </th>
                        )}
                        <th scope='col' className='px-4 py-3'>
                            Name
                        </th>
                        <th scope='col' className='px-4 py-3 text-center'>
                            Tags
                        </th>
                        <th scope='col' className='px-4 py-3'>
                            Last Update
                        </th>
                        {isOwner && (
                            <th scope='col' className='px-4 py-3'>
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {collection.items.length ? collection.items.map((item) => {
                        return (
                            <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={item._id}>
                                {isOwner && (
                                    <td scope='row' className='px-4 py-3'>
                                        <input
                                            className='cursor-pointer'
                                            type='checkbox'
                                            id={item._id}
                                            checked={ selectedItems.includes(item._id) }
                                            onChange={ handleCheckbox }
                                        />
                                    </td>
                                )}
                                <td className='px-4 py-3'>
                                    {item.name}
                                </td>
                                <td className='px-4 py-3 max-w-48'>
                                    {item.tags.map((tag, index) => (
                                        <Badge key={index} className='ml-1'>
                                            {tag}
                                        </Badge>
                                    ))}
                                </td>
                                <td className='px-4 py-3'>
                                    {formatDistance(
                                        item?.lastUpdate,
                                        new Date(),
                                        { addSuffix: true }
                                    )}
                                </td>
                                {isOwner && item && (
                                    <td className='px-4 py-3'>
                                        <ItemDialog
                                            title='Edit'
                                            getCollection={getCollection}
                                            collection={collection}
                                            OldItem={item}
                                            itemId={item._id}
                                        />
                                        <Button
                                            size='sm'
                                            className='ml-2'
                                            onClick={() => navigate(`/item/${item._id}`)}
                                        >
                                            Go To Item
                                        </Button>
                                    </td>
                                )}
                            </tr>
                        )
                    }) : (
                            <tr className='text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                <td colSpan={5} className='py-6 font-bold text-lg'>
                                    No Items in Collection
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            { (selectedItems.length && isOwner) ? (
                <ItemsActivityMenu
                    selectedItems={selectedItems}
                    getCollection={getCollection}
                    collectionId={collection._id}
                />
            ) : ''}
        </div>
    )
}

export default CollectionPage
