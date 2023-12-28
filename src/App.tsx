import { useState } from 'react'
import { ThemeProvider } from "@/components/theme-provider"

import './App.css'
import Navbar from './components/Navbar'

const App = () => {

  return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Navbar />
        </ThemeProvider>
  )
}

export default App
