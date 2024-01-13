import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

import MyCollectionsList from '@/components/MyCollectionsList'
import { useAppSelector } from '@/hooks/redux'
import { useNavigate, useLocation } from 'react-router-dom'
// import AddCollection from './AddCollection'

const MyCollections = () => {
    const { user } = useAppSelector(state => state.userReducer)
    const navigate = useNavigate()
    const location = useLocation()

    const collectionOwnerId = location.pathname.split('/').slice(-1)[0]
    const canCreateCollection = user.id === collectionOwnerId || user.isAdmin

    return (
        <div className='space-y-6 mt-24'>
            <div className='flex justify-between'>
                <div className='flex items-center'>
                    <p className='text-muted-foreground mr-2'>
                        Collections owner:
                    </p>
                    <h3 className='font-medium'>{collectionOwnerId}</h3>
                </div>
                { canCreateCollection && (
                    <Button onClick={() => navigate('/create')}>
                        Add Collection
                    </Button>
                )}
            </div>
            <Separator />
            <MyCollectionsList />
        </div>
    )
}

export default MyCollections;
