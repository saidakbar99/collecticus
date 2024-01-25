import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

import ItemService, { FetchedItems } from '@/services/ItemService'


const ItemPage = () => {
    const location = useLocation()

    const [item, setItem] = useState<FetchedItems>()

    const fetchItem = async () => {
        const itemId = location.pathname.split('/').slice(-1)[0]
        try {
            const response = await ItemService.getItem(itemId)

            setItem(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchItem()
    },[])

    return (
        <div className='grid grid-cols-1 gap-4 lg:gap-0 lg:grid-cols-3 mt-6'>
            <div className='grid grid-cols-2 gap-4 text-lg p-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
                <div className='text-right'>
                    <p className='mb-2'>Item Name</p>
                    {item?.extraFields.map((field) => (
                        <p className='mb-2'>{field.label}</p>
                    ))}
                </div>
                <div>
                    <p className='mb-2'>{item?.name}</p>
                    {item?.extraFields.map((field) => (
                        <p className='mb-2'>{field.value}</p>
                    ))}
                </div>
            </div>
            <div className='text-center'>
                <p className='text-4xl mb-2'>{item?.parentCollection.topic}</p>
                <p>Creator: {item?.parentCollection.user.username}</p>
                <div className='w-24 h-10 mx-auto mt-6 flex justify-between px-3 items-center rounded-lg border border-gray-200 shadow-md bg-white dark:bg-gray-800 dark:border-gray-700'>
                    <button>
                        <ThumbsUp />
                    </button>
                    <p>5</p>
                    <button>
                        <ThumbsDown />
                    </button>
                </div>
            </div>
            <div>
                <p>Tags:</p>
                <div className='p-2 flex flex-wrap bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
                    {item?.tags.length ? item.tags.map((tag) => (
                        <Badge key={tag} className='h-6 m-2 cursor-pointer'>
                            {tag}
                        </Badge>
                    )) : (
                        <p>No Tags</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ItemPage
