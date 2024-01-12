import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom"

import ItemCard from '@/components/ItemCard'
import CollectionService, { Collections } from '@/services/CollectionService'
import { Button } from '../components/ui/button'

const CollectionPage = () => {
    const location = useLocation()

    const [collection, setCollection] = useState<Collections>()

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

    return (
        < >
            <div className="grid grid-cols-2 mt-[72px] p-12">
                <div>
                    <p className="text-4xl">{collection?.topic} Collection</p>
                    <p>{collection?.title}</p>
                    <p>{collection?.description}</p>
                    <p>{collection?.user.username}</p>
                    <Button>Add Item</Button>
                </div>
                <div className="">
                    <img className="h-auto max-w-full rounded-lg" src="https://placehold.co/600x400" alt="" />
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* {Array(10).map((item) => (
                    <div className="grid gap-8 lg:grid-cols-2">
                        <article className="p-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <div>
                                <img className="rounded-lg" src="https://placehold.co/600x400" alt="123" />
                            </div>
                            <div className="flex justify-between items-center my-2 text-gray-500">
                                <Badge>Topic</Badge>
                                <span className="text-sm">14 days ago</span>
                            </div>
                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Book Collection</h2>
                            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even.</p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                                    <span className="font-medium dark:text-white">
                                        Jese Leos
                                    </span>
                                </div>
                            </div>
                        </article>
                    </div>
                ))} */}
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                {/* <Card onClick={() => navigate('/item/123123')}>
                    <CardHeader>
                        <img className="h-auto max-w-full rounded-lg" src="https://placehold.co/600x400" alt="" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Sherlock Holmes</CardTitle>
                        <CardDescription>Author: Saidakbar</CardDescription>
                    </CardContent>
                    <CardFooter>Likes: 5</CardFooter>
                </Card> */}
            </div>
        </>
    )
}

export default CollectionPage
