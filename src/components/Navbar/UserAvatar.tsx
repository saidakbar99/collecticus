import { useNavigate } from 'react-router-dom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useAppDispatch } from '@/hooks/redux'
import { saveUser } from '@/store/reducers/UserSlice'
import AuthService from '@/services/AuthService'
import { useAppSelector } from '@/hooks/redux'

export function UserAvatar() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { user: {
        isAdmin,
        username,
        email,
        id
     } } = useAppSelector(state => state.userReducer)

    const logout = async () => {
        try {
            await AuthService.logout()
            localStorage.removeItem('token')
            dispatch(saveUser(''))
            navigate('/')
        } catch (e) {
            console.error('Error with Logout: ', e)
        }
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <img
                    className='w-8 h-8 rounded-full cursor-pointer'
                    src={`https://source.boringavatars.com/bauhaus/30/${username}`}
                    alt='Random Avatar'
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end'>
                <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1 cursor-default'>
                        <p className='text-sm font-medium leading-none'>
                            {username}
                        </p>
                        <p className='text-xs leading-none text-muted-foreground'>
                            {email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className='cursor-pointer' onClick={() => navigate(`/collections/${id}`)}>
                        My Collections
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer' onClick={() => navigate('/create')}>
                        Create Collection
                    </DropdownMenuItem>
                    {isAdmin && (
                        <DropdownMenuItem className='cursor-pointer' onClick={() => navigate('/admin')}>
                            Admin Page
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer' onClick={logout}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
