import { useEffect, useState } from 'react'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

import CollectionsGallery from '@/components/CollectionsGallery'
import CollectionService, { FetchedCollections } from '@/services/CollectionService'
import ItemService, { FetchedItems } from '@/services/ItemService'
import ItemCard from '@/components/ItemCard'

export default function HomePage() {
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
        <div className='grid grid-cols-4'>
            <div className='col-span-3 col-span-4 '>
                <div className='h-full py-6 lg:px-8'>
                    <div className='border-none p-0 outline-none'>
                        <div className='flex items-center justify-between'>
                            <div className='space-y-1'>
                                <h2 className='text-2xl font-semibold tracking-tight'>
                                    Biggest Collections
                                </h2>
                                <p className='text-sm text-muted-foreground'>
                                    Top picks for you. Updated daily.
                                </p>
                            </div>
                        </div>
                        <Separator className='my-4' />
                        <div className='relative'>
                            <ScrollArea>
                                <div className='flex space-x-4 pb-4'>
                                    {biggestCollections.map((collection, index) => (
                                        <CollectionsGallery
                                            key={index}
                                            collection={collection}
                                        />
                                    ))}
                                </div>
                                <ScrollBar orientation='horizontal' />
                            </ScrollArea>
                        </div>
                        <div className='mt-6 space-y-1'>
                            <h2 className='text-2xl font-semibold tracking-tight'>
                                Recently Created Items
                            </h2>
                        </div>
                        <Separator className='my-4' />
                        <div className='relative'>
                            <ScrollArea>
                                <div className='flex space-x-4 p-2 pb-6'>
                                    {lastCreatedItems.map((item) => (
                                        <ItemCard item={item} key={item._id} />
                                    ))}
                                </div>
                                <ScrollBar orientation='horizontal' />
                            </ScrollArea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
