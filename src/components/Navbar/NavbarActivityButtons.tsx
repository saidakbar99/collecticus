import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const NavbarActivityButtons = () => {
    //! get from redux
    const isAuth = false

    if (isAuth) {
        return (
            <div className='flex items-center ml-12'>
                <Link to='/create'>
                    <button
                        type='button'
                        className='mr-8 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700'
                    >
                        Create Collection
                    </button>
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
                <button
                    type='button'
                    className='ml-12 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700'
                >
                    Login
                </button>
            </Link>
        )
    }
}

export default NavbarActivityButtons;
