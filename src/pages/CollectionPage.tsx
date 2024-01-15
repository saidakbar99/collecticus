import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { formatDistance } from 'date-fns/formatDistance'

import CollectionService, { FetchedCollections } from '@/services/CollectionService'
import ItemDialog from '@/components/ItemDialog'
import { useAppSelector } from '@/hooks/redux'

const CollectionPage = () => {
    const location = useLocation()
    const { user } = useAppSelector(state => state.userReducer)

    const [collection, setCollection] = useState<FetchedCollections>()

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

    if(!collection) {
        return <div></div>
    }

    const isOwner = collection.user.id === user.id || user.isAdmin

    // const [collections, setCollections] = useState<FetchedCollections[]>([])
    // const [isSelectedAll, setIsSelectedAll] = useState(false)
    // const [selectedCollections, setSelectedCollections] = useState<string[]>([])

    // const getUserCollections = async () => {
    //     try {
    //         const response = await CollectionService.fetchUserCollections(collectionOwnerId)
    //         setCollections(response.data)
    //     } catch (e) {
    //         console.error('Error fetching collections: ', e)
    //     }
    // }

    // const handleSelectAll = () => {
    //     setIsSelectedAll(!isSelectedAll)
    //     setSelectedCollections(collections.map(collection => collection._id))

    //     if (isSelectedAll) {
    //       setSelectedCollections([])
    //     }
    // }

    // const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { id, checked } = e.target
    //     setSelectedCollections([...selectedCollections, id])

    //     if (!checked) {
    //       setSelectedCollections(selectedCollections.filter(item => item !== id))
    //     }
    // }

    // useEffect(() => {
    //     getUserCollections()
    // }, [])

    return (
        < >
            <div className='grid grid-cols-2 mt-[72px] p-12'>
                <div>
                    <p className='text-4xl'>{collection?.topic} Collection</p>
                    <p>{collection?.title}</p>
                    <p>{collection?.description}</p>
                    <p>
                        {formatDistance(
                            collection?.createdAt,
                            new Date(),
                            { addSuffix: true }
                        ) }
                    </p>
                    <p>{collection?.user.username}</p>
                    <ItemDialog outline={false} title='Add' getCollection={getCollection} />
                </div>
                <div className=''>
                    <img className='h-auto max-w-full rounded-lg' src='https://placehold.co/600x400' alt='' />
                </div>
            </div>
            {/* <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {collection?.items.map((item) => (
                    <ItemCard key={item._id} item={item} collection={collection} />
                ))}
            </div> */}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b">
                    <tr>
                        {isOwner && (
                            <th scope="col" className="px-4 py-3">
                                {/* <Checkbox
                                    checked={ isSelectedAll }
                                    onCheckedChange={ handleSelectAll }
                                /> */}
                                <input
                                    className="cursor-pointer"
                                    type="checkbox"
                                    // checked={ isSelectedAll }
                                    // onChange={ handleSelectAll }
                                />
                            </th>
                        )}
                        <th scope="col" className="px-4 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Tags
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Created Data
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {collection.items.length ? collection.items.map((item) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item._id}>
                            {isOwner && (
                                <td scope="row" className="px-4 py-3">
                                    {/* <Checkbox
                                        checked={selectedCollections.includes(user._id)}
                                        // onCheckedChange={ (isChecked: boolean) => handleCheckbox(isChecked) }
                                    /> */}
                                    <input
                                        className="cursor-pointer"
                                        type="checkbox"
                                        id={item._id}
                                        // checked={ selectedCollections.includes(item._id) }
                                        // onChange={ handleCheckbox }
                                    />
                                </td>
                            )}
                            <td scope="row" className="px-4 py-3">
                                {item.name}
                            </td>
                            <td className="px-4 py-3">
                                {item.tags}
                            </td>
                            <td className="px-4 py-3">
                                {formatDistance(
                                    item?.createdAt,
                                    new Date(),
                                    { addSuffix: true }
                                )}
                            </td>
                            <td className="px-4 py-3">
                                <ItemDialog outline title='Edit' getCollection={getCollection} itemId={item._id} />
                            </td>
                        </tr>
                        )) : (
                            //! refactor
                            <div>no items</div>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

export default CollectionPage
