import { Button } from "@/components/ui/button"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

import { useAppDispatch } from "@/hooks/redux"
import { saveUser } from "@/store/reducers/UserSlice"
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
            console.error('>>>', e)
        }
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-9 w-9">
                <AvatarImage src="https://github.com/shadcn.png" alt="Avatar Image" />
                <AvatarFallback>U</AvatarFallback>
                </Avatar>
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1 cursor-default">
                    <p className="text-sm font-medium leading-none">
                        {username}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                        {email}
                    </p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/settings')}>
                    Profile Settings
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate(`/collections/${id}`)}>
                    My Collections
                    <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/create')}>
                    Create Collection
                    <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
                </DropdownMenuItem>
                {isAdmin && (
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/admin')}>
                        Admin Page
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
