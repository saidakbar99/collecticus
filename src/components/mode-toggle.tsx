import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Switch } from '@/components/ui/switch'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  const handleClick = (theme: string) => {
    if (theme === 'light') {
        setTheme('dark')
    } else {
        setTheme('light')
    }
  }

  return (
    <div className="flex items-center justify-center">
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <Switch id="theme-switch" className="mx-2"  onClick={() => handleClick(theme)} />
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    </div>
  )
}
