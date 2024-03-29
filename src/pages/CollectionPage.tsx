import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { formatDistance } from 'date-fns/formatDistance'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import CollectionService, { FetchedCollections } from '@/services/CollectionService'
import ItemDialog from '@/components/ItemDialog'
import { useAppSelector } from '@/hooks/redux'
import ItemsActivityMenu from '@/components/ItemsActivityMenu'
import { FetchedItems } from '@/services/ItemService'
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

    const handleCheckbox = (checked: boolean, itemId: string) => {
        setSelectedItems(prevSelectedItems => {
          if (checked) {
            return [...prevSelectedItems, itemId];
          } else {
            return prevSelectedItems.filter(item => item !== itemId);
          }
        })
    }

    return (
        <div className='mt-6'>
            <div className='grid grid-cols-1 px-2 sm:grid-cols-2 sm:px-12 mb-6'>
                <div>
                    <p className='text-3xl lg:text-4xl'>{collection?.title}</p>
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
                        <ItemDialog title='Add Item' getCollection={getCollection} collection={{...collection, items: []}} />
                    )}
                </div>
                <img
                    className='rounded-lg mt-6 sm:mt-0'
                    src={collection.image_url || IMAGE_PLACEHOLDER}
                    alt='collectionImage'
                />
            </div>
            <div className='overflow-x-auto'>
                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 border lg:mt-8'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b'>
                        <tr>
                            {isOwner && (
                                <th scope='col' className='px-4 py-3'>
                                    {/* <iz  */}
                                    <Checkbox
                                        checked={ isSelectedAll }
                                        onCheckedChange={ handleSelectAll }
                                    />
                                </th>
                            )}
                            <th scope='col' className='px-4 py-3 min-w-20'>
                                Name
                            </th>
                            <th scope='col' className='px-4 py-3 text-center min-w-20'>
                                Tags
                            </th>
                            <th scope='col' className='px-4 py-3 min-w-20'>
                                Last Update
                            </th>
                            {isOwner && (
                                <th scope='col' className='px-4 py-3 min-w-20'>
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
                                            <Checkbox
                                                checked={selectedItems.includes(item._id)}
                                                onCheckedChange={ (checked: boolean) => handleCheckbox(checked, item._id) }
                                            />
                                        </td>
                                    )}
                                    <td className='px-4 py-3'>
                                        {item.name}
                                    </td>
                                    <td className='px-4 py-3 max-w-48'>
                                        {item.tags.map((tag, index) => (
                                            <Badge key={index} className='ml-1 mb-1'>
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
                                        <td className='px-4 py-3 flex flex-nowrap'>
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
                                                Link
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
            </div>
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
