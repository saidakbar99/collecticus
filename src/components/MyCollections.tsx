import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import moment from 'moment'

import { FetchedCollections } from '@/services/CollectionService'
import CollectionService from '@/services/CollectionService'
import CollectionActivityMenu from '@/components/CollectionActivityMenu'
import { useAppSelector } from '@/hooks/redux'

const MyCollections = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { user } = useAppSelector(state => state.userReducer)

    const [collections, setCollections] = useState<FetchedCollections[]>([])
    const [isSelectedAll, setIsSelectedAll] = useState(false)
    const [selectedCollections, setSelectedCollections] = useState<string[]>([])

    const collectionOwnerId = location.pathname.split('/').slice(-1)[0]
    const isOwner = user.id === collectionOwnerId || user.isAdmin

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

    const handleCheckbox = (checked: boolean, collectionId: string) => {
        setSelectedCollections(prevSelectedCollections => {
          if (checked) {
            return [...prevSelectedCollections, collectionId];
          } else {
            return prevSelectedCollections.filter(item => item !== collectionId);
          }
        });
      };

    useEffect(() => {
        getUserCollections()
    }, [])

    return (
        <div className='overflow-x-auto mt-6'>
            <div className='flex justify-between mb-4'>
                <div className='flex flex-col sm:flex-row'>
                    <p className='text-muted-foreground mr-2'>
                        Collections owner:
                    </p>
                    <h3 className='font-medium'>{user.username}</h3>
                </div>
                { isOwner && (
                    <Button onClick={() => navigate('/create')}>
                        Add Collection
                    </Button>
                )}
            </div>
            <Separator />
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border '>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b'>
                    <tr>
                        {(isOwner && collections.length) ? (
                            <th scope='col' className='px-4 py-3'>
                                <Checkbox
                                    checked={ isSelectedAll }
                                    onCheckedChange={ handleSelectAll }
                                />
                            </th>
                        ) : ''}
                        <th scope='col' className='px-4 py-3'>
                            Title
                        </th>
                        <th scope='col' className='px-4 py-3'>
                            Topic
                        </th>
                        <th scope='col' className='px-4 py-3'>
                            Items Count
                        </th>
                        <th scope='col' className='px-4 py-3'>
                            Extra Fields Count
                        </th>
                        <th scope='col' className='px-4 py-3'>
                            Created Data
                        </th>
                        <th scope='col' className='px-4 py-3'>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {collections.length ? collections.map((collection) => (
                        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={collection._id}>
                            {isOwner && (
                                <td scope='row' className='px-4 py-3'>
                                    <Checkbox
                                        checked={selectedCollections.includes(collection._id)}
                                        onCheckedChange={(checked: boolean) => handleCheckbox(checked, collection._id)}
                                    />
                                </td>
                            )}
                            <td scope='row' className='px-4 py-3'>
                                {collection.title}
                            </td>
                            <td className='px-4 py-3'>
                                {collection.topic}
                            </td>
                            <td className='px-4 py-3'>
                                {collection.items.length}
                            </td>
                            <td className='px-4 py-3'>
                                {collection.extraFields.length}
                            </td>
                            <td className='px-4 py-3'>
                                {moment(collection.createdAt).format('L')}
                            </td>
                            <td className='px-4 py-3'>
                                <Link to={`/collection/${collection._id}`}>
                                    Edit
                                </Link>
                            </td>
                        </tr>
                        )) : (
                            <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                <td className='px-4 py-3 text-center text-xl font-semibold' colSpan={7}>
                                    No Collections
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <CollectionActivityMenu selectedCollections={selectedCollections} getUserCollections={getUserCollections} />
        </div>
    )
}

export default MyCollections
