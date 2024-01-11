import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

// import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import { AlbumArtwork } from "./album-artwork"
import { listenNowAlbums, madeForYouAlbums } from "./data/album"
import CollectionService, { Collections } from '../services/CollectionService'

export default function HomePage() {
    const navigate = useNavigate()
    const [collections, setCollections] = useState<Collections[]>([])
    const [biggestCollections, setBiggestCollections] = useState<Collections[]>([])

    const getCollections = async () => {
        try {
            const response = await CollectionService.fetchAllCollections()
            setCollections(response.data)
            setBiggestCollections(response.data.slice(0,5))
        } catch (e) {
            console.error('Error fetching collections: ', e)
        }
    }

    console.log('>>>', biggestCollections)

    useEffect(() => {
        getCollections()
    }, [])

    if (!collections.length) {
        return <div></div>
    }

    return (
        <div className="hidden md:block">
            <div className="mt-[72px]">
                <div className="grid lg:grid-cols-4">
                    <div className="col-span-3 lg:col-span-4 ">
                        <div className="h-full py-6 lg:px-8">
                            <div
                            className="border-none p-0 outline-none"
                            >
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
                                    <div className="flex space-x-4 pb-4 cursor-pointer">
                                        {biggestCollections.map((collection, index) => (
                                            <AlbumArtwork
                                                key={index}
                                                collection={collection}
                                                className="w-[250px]"
                                                aspectRatio="portrait"
                                                width={250}
                                                height={330}
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
                                <div className="flex space-x-4 pb-4">
                                    {madeForYouAlbums.map((album) => (
                                    <AlbumArtwork
                                        key={Math.random()}
                                        album={album}
                                        className="w-[150px]"
                                        aspectRatio="square"
                                        width={150}
                                        height={150}
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
            </div>
        </div>
    )
}