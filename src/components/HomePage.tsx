// import { Metadata } from "next"
// import Image from "next/image"
// import { PlusCircledIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"

// import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import { AlbumArtwork } from "./album-artwork"
import { listenNowAlbums, madeForYouAlbums } from "./data/album"

export default function HomePage() {
    const navigate = useNavigate()
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
                                        {listenNowAlbums.map((collection) => (
                                            <AlbumArtwork
                                                key={Math.random()}
                                                album={collection}
                                                className="w-[250px]"
                                                aspectRatio="portrait"
                                                width={250}
                                                height={330}
                                                onClick={() => navigate(`/collection/${collection.name}`)}
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