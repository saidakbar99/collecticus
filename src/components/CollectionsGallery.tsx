import { cn } from "@/lib/utils"
import { Badge } from '@/components/ui/badge'
import { formatDistance } from 'date-fns/formatDistance'

import { Collections } from "@/services/CollectionService"

interface CollectionsGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  collection: Collections
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function CollectionsGallery({
  collection,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: CollectionsGalleryProps) {
    return (
        <div className={cn("space-y-3 p-3 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700", className)} {...props}>
            <div className="overflow-hidden rounded-md">
                <img
                src={collection.image_url ? collection.image_url : 'https://placehold.co/600x400?text=Collecticus'}
                width={width}
                height={height}
                className={cn(
                    "h-auto w-auto object-cover transition-all hover:scale-105 aspect-square",
                    aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                )}
                />
            </div>
            <div className="flex justify-between items-center my-2 text-gray-500">
                <Badge className="text-xs">{collection.topic}</Badge>
                <span className="text-sm">
                    {formatDistance(
                        collection?.createdAt,
                        new Date(),
                        { addSuffix: true }
                    )}
                </span>
            </div>
            <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{collection.title}</h2>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400 truncate">{collection.description}</p>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                    <span className="text-sm font-medium dark:text-white">
                        {collection.user.username}
                    </span>
                </div>
            </div>
            {/* <div className="space-y-1 text-sm">
                <h3 className="font-medium leading-none">{collection?.title}</h3>
                <p className="text-xs text-muted-foreground">{collection?.user.username}</p>
            </div> */}
        </div>
    )
}