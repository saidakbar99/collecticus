import { Routes, Route } from "react-router-dom"

import { ThemeProvider } from "@/components/theme-provider"
import routes from './routes'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from "./components/Footer"

const App = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
            <div className='bg-[#fafafa] dark:bg-gray-900 min-h-screen px-8 flex flex-col justify-between border '>
                <Navbar />
                <Routes>
                    {routes.map(({path, element}, index) => {
                        return (
                            <Route path={path} element={element} key={index} />
                        )
                    })}
                </Routes>
                <Footer />
            </div>
        </ThemeProvider>
    )
}

export default App
