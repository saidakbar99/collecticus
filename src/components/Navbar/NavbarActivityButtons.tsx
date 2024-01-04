import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '../ui/button'

const NavbarActivityButtons = () => {
    //! get from redux
    const isAuth = false

    if (isAuth) {
        return (
            <div className='flex items-center ml-12'>
                <Link to='/create'>
                    <Button
                        type='button'
                        className='mr-8'
                    >
                        Create Collection
                    </Button>
                </Link>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>UserName</AvatarFallback>
                </Avatar>
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
