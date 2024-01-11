import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import CollectionService, { Collections } from '@/services/CollectionService'
import { Button } from '../components/ui/button'

const CollectionPage = () => {
    const navigate = useNavigate()
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
                <Card onClick={() => navigate('/item/123123')}>
                    <CardHeader>
                        <img className="h-auto max-w-full rounded-lg" src="https://placehold.co/600x400" alt="" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Sherlock Holmes</CardTitle>
                        <CardDescription>Author: Saidakbar</CardDescription>
                    </CardContent>
                    <CardFooter>Likes: 5</CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <img className="h-auto max-w-full rounded-lg" src="https://placehold.co/600x400" alt="" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Sherlock Holmes</CardTitle>
                        <CardDescription>Author: Saidakbar</CardDescription>
                    </CardContent>
                    <CardFooter>Likes: 5</CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <img className="h-auto max-w-full rounded-lg" src="https://placehold.co/600x400" alt="" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Sherlock Holmes</CardTitle>
                        <CardDescription>Author: Saidakbar</CardDescription>
                    </CardContent>
                    <CardFooter>Likes: 5</CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <img className="h-auto max-w-full rounded-lg" src="https://placehold.co/600x400" alt="" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Sherlock Holmes</CardTitle>
                        <CardDescription>Author: Saidakbar</CardDescription>
                    </CardContent>
                    <CardFooter>Likes: 5</CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <img className="h-auto max-w-full rounded-lg" src="https://placehold.co/600x400" alt="" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Sherlock Holmes</CardTitle>
                        <CardDescription>Author: Saidakbar</CardDescription>
                    </CardContent>
                    <CardFooter>Likes: 5</CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <img className="h-auto max-w-full rounded-lg" src="https://placehold.co/600x400" alt="" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Sherlock Holmes</CardTitle>
                        <CardDescription>Author: Saidakbar</CardDescription>
                    </CardContent>
                    <CardFooter>Likes: 5</CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <img className="h-auto max-w-full rounded-lg" src="https://placehold.co/600x400" alt="" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Sherlock Holmes</CardTitle>
                        <CardDescription>Author: Saidakbar</CardDescription>
                    </CardContent>
                    <CardFooter>Likes: 5</CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <img className="h-auto max-w-full rounded-lg" src="https://placehold.co/600x400" alt="" />
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Sherlock Holmes</CardTitle>
                        <CardDescription>Author: Saidakbar</CardDescription>
                    </CardContent>
                    <CardFooter>Likes: 5</CardFooter>
                </Card>
            </div>
        </>
    )
}

export default CollectionPage
