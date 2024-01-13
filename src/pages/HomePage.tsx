import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import { CollectionsGallery } from "@/components/CollectionsGallery"
import CollectionService, { FetchedCollections } from '@/services/CollectionService'

export default function HomePage() {
    const navigate = useNavigate()
    const [recentlyCollections, setRecentlyCollections] = useState<FetchedCollections[]>([])
    const [biggestCollections, setBiggestCollections] = useState<FetchedCollections[]>([])

    const getCollections = async () => {
        try {
            const biggestCollectionsResponse = await CollectionService.fetchAllCollections()
            const recentlyCollectionResponse = await CollectionService.fetchLastCollections()
            setRecentlyCollections(recentlyCollectionResponse.data)
            //! vvv sort by items count vvv
            setBiggestCollections(biggestCollectionsResponse.data.slice(0,5))
        } catch (e) {
            console.error('Error fetching collections: ', e)
        }
    }

    useEffect(() => {
        getCollections()
    }, [])

    if (!recentlyCollections.length) {
        return <div>Loading...</div>
    }

    return (
        <div className="grid lg:grid-cols-4 mt-[72px]">
            <div className="col-span-3 lg:col-span-4 ">
                <div className="h-full py-6 lg:px-8">
                    <div className="border-none p-0 outline-none">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    Biggest Collections
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Top picks for you. Updated daily.
                                </p>
                            </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="relative">
                            <ScrollArea>
                                {/* <div className="grid gap-8 lg:grid-cols-5"> */}
                                <div className="flex space-x-4 pb-4 cursor-pointer">
                                    {biggestCollections.map((collection, index) => (
                                        <CollectionsGallery
                                            key={index}
                                            collection={collection}
                                            className="w-[250px]"
                                            aspectRatio="square"
                                            width={250}
                                            height={250}
                                            onClick={() => navigate(`/collection/${collection._id}`)}
                                        />
                                    ))}
                                </div>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        </div>
                        <div className="mt-6 space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                                Recently Created Collections
                            </h2>
                        </div>
                        <Separator className="my-4" />
                        <div className="relative">
                            <ScrollArea>
                            <div className="flex space-x-4 pb-4 cursor-pointer">
                                {
                                //! Check to fetch last created Collections
                                recentlyCollections.map((collection) => (
                                <CollectionsGallery
                                    key={Math.random()}
                                    collection={collection}
                                    className="w-[200px]"
                                    aspectRatio="square"
                                    width={150}
                                    height={150}
                                    onClick={() => navigate(`/collection/${collection._id}`)}
                                />
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        </div>
                        <div className="mt-8">
                        TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}