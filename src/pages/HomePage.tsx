import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import { CollectionsGallery } from "@/components/CollectionsGallery"
import CollectionService, { FetchedCollections } from '@/services/CollectionService'
import ItemService, { FetchedItems } from '@/services/ItemService'
import ItemCard from '@/components/ItemCard'

export default function HomePage() {
    const navigate = useNavigate()
    const [lastCreatedItems, setLastCreatedItems] = useState<FetchedItems[]>([])
    const [biggestCollections, setBiggestCollections] = useState<FetchedCollections[]>([])

    const getCollections = async () => {
        try {
            const biggestCollectionsResponse = await CollectionService.fetchTopCollections()
            const lastCreatedItemsResponse = await ItemService.getLastItems()
            setLastCreatedItems(lastCreatedItemsResponse.data)
            setBiggestCollections(biggestCollectionsResponse.data)
        } catch (e) {
            console.error('Error fetching collections: ', e)
        }
    }

    useEffect(() => {
        getCollections()
    }, [])

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
                                <div className="flex space-x-4 pb-4">
                                    {biggestCollections.map((collection, index) => (
                                        <CollectionsGallery
                                            key={index}
                                            collection={collection}
                                            className="w-[250px] cursor-pointer"
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
                                Recently Created Items
                            </h2>
                        </div>
                        <Separator className="my-4" />
                        <div className="relative">
                            <ScrollArea>
                                <div className="flex space-x-4 p-2 pb-6">
                                    {lastCreatedItems.map((item) => (
                                        <ItemCard item={item} key={item._id} />
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

// rules_version = '2';

// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write: if
//           request.time < timestamp.date(2024, 2, 17);
//     }
//   }
// }