import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDistance } from 'date-fns/formatDistance'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Badge } from '@/components/ui/badge'

import { FetchedCollections } from "@/services/CollectionService"
import { IMAGE_PLACEHOLDER } from "@/config/config"

interface CollectionsGalleryProps {
  collection: FetchedCollections
}

const CollectionsGallery: FC<CollectionsGalleryProps> = ({collection}) => {
    const navigate = useNavigate()

    return (
        <article
            className="w-[250px] flex flex-col justify-between cursor-pointer p-3 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
            onClick={() => navigate(`/collection/${collection._id}`)}
        >
            <div className="overflow-hidden rounded-md relative">
                <img
                    src={collection.image_url || IMAGE_PLACEHOLDER}
                    className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square z-20"
                />
            </div>
            <div className="flex justify-between items-center mt-4 mb-3 text-gray-500">
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
            <div className="mb-5 font-light text-gray-500 dark:text-gray-400 max-h-12 overflow-hidden truncate">
                <Markdown remarkPlugins={[remarkGfm]}>
                    {collection?.description}
                </Markdown>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                    <span className="text-sm font-medium dark:text-white">
                        {collection.user.username}
                    </span>
                </div>
            </div>
        </article>
    )
}

export default CollectionsGallery