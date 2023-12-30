import { ThemeProvider } from "@/components/theme-provider"

import './App.css'
import Navbar from './components/Navbar/Navbar'

const App = () => {

  return (
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
            <Navbar />
        </ThemeProvider>
  )
}

export default App
