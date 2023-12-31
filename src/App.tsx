import { Routes, Route } from "react-router-dom"

import { ThemeProvider } from "@/components/theme-provider"
import routes from './routes'
import './App.css'
import Navbar from './components/Navbar/Navbar'

const App = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
            <Navbar />
            <Routes>
                {routes.map(({path, element}, index) => {
                    return (
                        <Route path={path} element={element} key={index} />
                    )
                })}
            </Routes>
        </ThemeProvider>
    )
}

export default App
