import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

import { UserAvatar } from './UserAvatar'

const NavbarActivityButtons = () => {
    //! get from redux
    const isAuth = false

    if (isAuth) {
        return (
            <div className='flex items-center ml-12'>
                {/* <Link to='/create'>
                    <Button
                        type='button'
                        className='mr-8'
                    >
                        Create Collection
                    </Button>
                </Link> */}
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
