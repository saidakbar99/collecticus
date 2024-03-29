import { Outlet } from 'react-router-dom'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar/Navbar'

const MainLayout = () => {
    return (
        <div className='bg-[#fafafa] dark:bg-gray-900 min-h-screen px-4 sm:px-8 flex flex-col justify-between border pt-20 max-w-[1280px] mx-auto'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default MainLayout
