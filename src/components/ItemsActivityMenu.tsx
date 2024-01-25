import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, PackagePlus, Plus } from 'lucide-react'

import ItemService from '@/services/ItemService'

interface ItemsActivityMenuProps {
    selectedItems: string[]
    getCollection: () => void
    collectionId: string
}

const ItemsActivityMenu: React.FC<ItemsActivityMenuProps> = ({ selectedItems, getCollection, collectionId }) => {
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)

    const deleteItems = async () => {
        try {
            await ItemService.deleteItems(selectedItems, collectionId)
            getCollection()
        } catch (error) {
            console.error('Error removing users:', error)
        }
    }

    return (
        <div className='fixed end-6 bottom-6 group'>
            <div className={`${isOpen ? '' : 'hidden'} flex flex-col items-center mb-4 space-y-2  `}>
                <button
                    type='button'
                    className='flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600'
                    onClick={ deleteItems }
                >
                    <Trash2 />
                </button>
                <button
                    type='button'
                    className='flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600'
                    onClick={() => navigate('/create')}
                >
                    <PackagePlus />
                </button>
            </div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                type='button'
                className='flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700'
            >
                <Plus strokeWidth={1.75} className={`w-8 h-8 transition-transform ${isOpen ? 'rotate-45' : ''}`} />
            </button>
        </div>
    )
}

export default ItemsActivityMenu
