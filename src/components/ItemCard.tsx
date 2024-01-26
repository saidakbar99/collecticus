import { FC } from 'react'
import { formatDistance } from 'date-fns/formatDistance'
import { Badge } from '@/components/ui/badge'

import {FetchedItems} from '@/services/ItemService'
import { useNavigate } from 'react-router-dom'

interface ItemCardProps {
    item: FetchedItems
}

const ItemCard: FC<ItemCardProps> = ({ item }) => {
    const navigate = useNavigate()

    return (
        <article
            className='p-3 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 cursor-pointer transition-all hover:scale-105 w-[250px] flex flex-col justify-between'
            onClick={() => navigate(`/item/${item._id}`)}
        >
            <div className='flex justify-between items-center mb-4 text-gray-500'>
                <Badge className='text-xs'>{item.parentCollection.topic}</Badge>
                <span className='text-sm'>
                    {formatDistance(
                        item.lastUpdate,
                        new Date(),
                        { addSuffix: true }
                    )}
                </span>
            </div>
            <h2 className='mb-2  font-semibold text-lg tracking-tight'>Item: {item.name}</h2>
            <p className='mb-5 font-light text-gray-500 dark:text-gray-400'>Collection: {item.parentCollection.title}</p>
            <div className='flex justify-between items-center'>
                <div className='flex items-center space-x-4'>
                    <img
                        className='w-7 h-7 rounded-full'
                        src={`https://source.boringavatars.com/bauhaus/30/${item.parentCollection.user.username}`}
                        alt='Random Avatar'
                    />
                    <span className='font-medium dark:text-white'>
                        {item.parentCollection.user.username}
                    </span>
                </div>
            </div>
        </article>
    )
}

export default ItemCard
