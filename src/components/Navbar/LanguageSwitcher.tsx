import { useState } from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
  } from "@/components/ui/dropdown-menu"

const LanguageSwitcher = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('English')

    const handleClick = (language: string) => {
        if (language === 'English') {
            setSelectedLanguage('Russian')
        } else {
            setSelectedLanguage('English')
        }
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger>{selectedLanguage}</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleClick('English')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleClick('Russian')}>Russian</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LanguageSwitcher
