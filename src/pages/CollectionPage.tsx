import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { formatDistance } from 'date-fns/formatDistance'

import ItemCard from '@/components/ItemCard'
import CollectionService, { FetchedCollections } from '@/services/CollectionService'
import AddItem from '@/components/AddItem'

const CollectionPage = () => {
    const location = useLocation()
    const navigate = useNavigate()

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

    if(!collection) {
        return <div></div>
    }

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
                    <AddItem getCollection={getCollection} />
                </div>
                <div className=''>
                    <img className='h-auto max-w-full rounded-lg' src='https://placehold.co/600x400' alt='' />
                </div>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {collection?.items.map((item) => (
                    <ItemCard key={item._id} item={item} collection={collection} />
                ))}
            </div>
        </>
    )
}

export default CollectionPage
