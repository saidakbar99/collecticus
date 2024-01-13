import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'

import { useAppSelector } from "@/hooks/redux"
import { FetchedCollections } from "@/services/CollectionService"
import CollectionService from '@/services/CollectionService'

const MyCollectionsList = () => {
    const navigate = useNavigate()
    const { user } = useAppSelector(state => state.userReducer)

    const [collections, setCollections] = useState<FetchedCollections[]>([])

    const getUserCollections = async () => {
        try {
            const response = await CollectionService.fetchUserCollections(user.id)
            setCollections(response.data)
        } catch (e) {
            console.error('Error fetching collections: ', e)
        }
    }

    useEffect(() => {
        getUserCollections()
    }, [])

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {collections.map((item) => (
                    <article
                        className="p-4 cursor-pointer bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                        onClick={() => navigate(`/collection/${item._id}`)}
                        key={item._id}
                    >
                        <div>
                            <img className="rounded-lg h-auto w-auto object-cover transition-all hover:scale-105" src="https://placehold.co/600x400" alt="123" />
                        </div>
                        <div className="flex justify-between items-center my-2 text-gray-500">
                            <Badge>{item.topic}</Badge>
                            <span className="text-sm">14 days ago</span>
                        </div>
                        <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h2>
                        <p className="mb-5 font-light text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                                <span className="font-medium text-sm dark:text-white">
                                    {item.user.username}
                                </span>
                            </div>
                        </div>
                    </article>
                ))}
                {/* <div className="grid gap-8 lg:grid-cols-2">
                    <ItemCard />
                </div> */}
            </div>
    )
}

export default MyCollectionsList;
