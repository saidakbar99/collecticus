import { Badge } from '@/components/ui/badge'

const CollectionCard = () => {
    return (
        <article className="p-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div>
                <img className="rounded-lg h-auto w-auto object-cover transition-all hover:scale-105" src="https://placehold.co/600x400" alt="123" />
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
    )
}

export default CollectionCard;
