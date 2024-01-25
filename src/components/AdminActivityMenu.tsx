import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Trash2,
    UnlockKeyhole,
    LockKeyhole,
    Shield,
    ShieldOff,
    Plus
} from 'lucide-react'

import UserService from '@/services/UserService'
import { useAppSelector, useAppDispatch } from '@/hooks/redux'
import { saveUser } from '@/store/reducers/UserSlice'
import AuthService from '@/services/AuthService'
interface AdminActivityButtonProps {
    selectedUsers: string[]
    getUsers: () => void
}

const AdminActivityMenu: React.FC<AdminActivityButtonProps> = ({ selectedUsers, getUsers }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { user } = useAppSelector(state => state.userReducer)

    const [isOpen, setIsOpen] = useState(false)

    const logout = async () => {
        try {
            await AuthService.logout()
            localStorage.removeItem('token')
            dispatch(saveUser(''))
            navigate('/')
        } catch (e) {
            console.error('>>>', e)
        }
    }

    const deleteUsers = async () => {
        try {
            await UserService.deleteUsers(selectedUsers)

            if (selectedUsers.includes(user.id)) {
                logout()
            }

            getUsers()
        } catch (error) {
            console.error('Error removing users:', error)
        }
    }

    const blockUsers = async () => {
        try {
            await UserService.blockUsers(selectedUsers)

            if (selectedUsers.includes(user.id)) {
                logout()
            }

            getUsers()
        } catch (error) {
          console.error('Error removing users:', error)
        }
    }

    const unblockUsers = async () => {
        try {
            await UserService.unblockUsers(selectedUsers)
            getUsers()
        } catch (error) {
          console.error('Error removing users:', error)
        }
    }

    const makeAdminUsers = async () => {
        try {
            await UserService.makeAdmin(selectedUsers)
            getUsers()
        } catch (error) {
          console.error('Error removing users:', error)
        }
    }

    const unmakeAdminUsers = async () => {
        try {
            await UserService.unmakeAdmin(selectedUsers)

            if (selectedUsers.includes(user.id)) {
                dispatch(saveUser({...user, isAdmin: false}))
                navigate('/')
            }

            getUsers()
        } catch (error) {
          console.error('Error removing users:', error)
        }
    }

    return (
        <div className='fixed end-6 bottom-6 group'>
            <div className={`${isOpen ? '' : 'hidden'} flex flex-col items-center mb-4 space-y-2`}>
                <button
                    type='button'
                    className='flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600'
                    onClick={ deleteUsers }
                >
                    <Trash2 />
                </button>
                <button
                    type='button'
                    className='flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600'
                    onClick={ blockUsers }
                >
                    <LockKeyhole />
                </button>
                <button
                    type='button'
                    className='flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600'
                    onClick={ unblockUsers }
                >
                    <UnlockKeyhole />
                </button>
                <button
                    type='button'
                    className='flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 dark:hover:text-white shadow-sm dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600'
                    onClick={ makeAdminUsers }
                >
                    <Shield />
                </button>
                <button
                    type='button'
                    className='flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 dark:hover:text-white shadow-sm dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600'
                    onClick={ unmakeAdminUsers }
                >
                    <ShieldOff />
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

export default AdminActivityMenu
