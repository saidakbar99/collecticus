import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { FetchedCollections } from "@/services/CollectionService"
import CollectionService from '@/services/CollectionService'
import CollectionActivityMenu from './CollectionActivityMenu'

interface MyCollectionsListProps {
    isOwner: boolean
    collectionOwnerId: string
}

const MyCollectionsList: React.FC<MyCollectionsListProps> = ({isOwner, collectionOwnerId}) => {
    const [collections, setCollections] = useState<FetchedCollections[]>([])
    const [isSelectedAll, setIsSelectedAll] = useState(false)
    const [selectedCollections, setSelectedCollections] = useState<string[]>([])

    const getUserCollections = async () => {
        try {
            const response = await CollectionService.fetchUserCollections(collectionOwnerId)
            setCollections(response.data)
        } catch (e) {
            console.error('Error fetching collections: ', e)
        }
    }

    const handleSelectAll = () => {
        setIsSelectedAll(!isSelectedAll)
        setSelectedCollections(collections.map(collection => collection._id))

        if (isSelectedAll) {
          setSelectedCollections([])
        }
    }

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target
        setSelectedCollections([...selectedCollections, id])

        if (!checked) {
          setSelectedCollections(selectedCollections.filter(item => item !== id))
        }
    }

    useEffect(() => {
        getUserCollections()
    }, [])

    return (
        <>
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
                                    checked={ isSelectedAll }
                                    onChange={ handleSelectAll }
                                />
                            </th>
                        )}
                        <th scope="col" className="px-4 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Topic
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Items Count
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Extra Fields Count
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
                    {collections.length ? collections.map((collection) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={collection._id}>
                            {isOwner && (
                                <td scope="row" className="px-4 py-3">
                                    {/* <Checkbox
                                        checked={selectedCollections.includes(user._id)}
                                        // onCheckedChange={ (isChecked: boolean) => handleCheckbox(isChecked) }
                                    /> */}
                                    <input
                                        className="cursor-pointer"
                                        type="checkbox"
                                        id={collection._id}
                                        checked={ selectedCollections.includes(collection._id) }
                                        onChange={ handleCheckbox }
                                    />
                                </td>
                            )}
                            <td scope="row" className="px-4 py-3">
                                {collection.title}
                            </td>
                            <td className="px-4 py-3">
                                {collection.topic}
                            </td>
                            <td className="px-4 py-3">
                                {collection.items.length}
                            </td>
                            <td className="px-4 py-3">
                                {collection.extraFields.length}
                            </td>
                            <td className="px-4 py-3">
                                {moment(collection.createdAt).format('L')}
                            </td>
                            <td className="px-4 py-3">
                                <Link to={`/collection/${collection._id}`}>
                                    Edit
                                </Link>
                            </td>
                        </tr>
                        )) : (
                            //! refactor
                            <div>no col</div>
                        )
                    }
                </tbody>
            </table>
            <CollectionActivityMenu selectedCollections={selectedCollections} getUserCollections={getUserCollections} />
        </>
    )
}

export default MyCollectionsList;
