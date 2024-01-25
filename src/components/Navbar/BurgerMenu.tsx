import { Button } from "@/components/ui/button"
import { Search, Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import Logo from "./Logo"
import NavbarActivityButtons from "./NavbarActivityButtons"
import ModeToggle from "./ModeToggle"

const BurgerMenu = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side='left'>
                <SheetHeader>
                    <Logo />
                </SheetHeader>
                <div className='mt-12'>
                    <div className='relative flex'>
                        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                            <Search size={20} color='#9CA3AF' strokeWidth={1.25} />
                        </div>
                        <input
                            type='text'
                            className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                            placeholder='Search...  (soon)'
                            disabled
                        />
                    </div>
                </div>
                <div className='flex justify-between mt-6'>
                    <ModeToggle />
                    <NavbarActivityButtons />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default BurgerMenu