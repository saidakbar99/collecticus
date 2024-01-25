import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const LanguageSwitcher = () => {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger>English</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem disabled>Russian (soon)</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LanguageSwitcher
