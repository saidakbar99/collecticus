import { Search } from 'lucide-react'

import ModeToggle from './ModeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import NavbarActivityButtons from './NavbarActivityButtons'
import Logo from './Logo'

const Navbar = () => {
    return (
        <nav className='bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600'>
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
                <div className='flex'>
                    <div className='relative hidden md:block mr-12'>
                        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                            <Search size={20} color='#9CA3AF' strokeWidth={1.25} />
                        </div>
                        <input
                            type='text'
                            className='block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                            placeholder='Search...'
                        />
                    </div>
                    <ModeToggle />
                </div>
                <Logo />
                <div className='flex justify-between'>
                    <LanguageSwitcher />
                    <NavbarActivityButtons />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
