import {useState} from 'react'
import {
    Trash2,
    UnlockKeyhole,
    LockKeyhole,
    Shield,
    ShieldOff
} from 'lucide-react';

const AdminActivityMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div data-dial-init className="fixed end-6 bottom-6 group">
            <div id="speed-dial-menu-default" className={`${isOpen ? '' : 'hidden'} flex flex-col items-center mb-4 space-y-2  `}>
                <button type="button" className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600">
                    <Trash2 />
                    <span className="sr-only">Delete</span>
                </button>
                <button type="button" className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600">
                    <LockKeyhole />
                    <span className="sr-only">Block</span>
                </button>
                <button type="button" className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600">
                    <UnlockKeyhole />
                    <span className="sr-only">UnBlock</span>
                </button>
                <button type="button" className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 dark:hover:text-white shadow-sm dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600">
                    <Shield />
                    <span className="sr-only">Make Admin</span>
                </button>
                <button type="button" className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 dark:hover:text-white shadow-sm dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600">
                    <ShieldOff />
                    <span className="sr-only">Remove Admin</span>
                </button>
            </div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                data-dial-toggle="speed-dial-menu-default"
                aria-controls="speed-dial-menu-default"
                aria-expanded="false"
                className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
                <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                </svg>
                <span className="sr-only">Open actions menu</span>
            </button>
        </div>

    )
}

export default AdminActivityMenu;
