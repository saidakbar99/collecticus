import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

import { useAppSelector } from "@/hooks/redux"
import { UserAvatar } from './UserAvatar'

const NavbarActivityButtons = () => {
    const { isAuth } = useAppSelector(state => state.userReducer)
    // const test = useAppSelector(state => state.userReducer)

    if (isAuth) {
        return (
            <div className='flex items-center ml-12'>
                <UserAvatar />
            </div>
        )
    } else {
        return (
            <Link to='/auth'>
                <Button
                    type='button'
                    className='ml-12'
                >
                    Login
                </Button>
            </Link>
        )
    }
}

export default NavbarActivityButtons;
