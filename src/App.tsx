import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/ui/theme-provider"

import './App.css'
import MainLayout from "@/components/MainLayout"
import PrivateRoute from '@/components/PrivateRoute'
import AdminRoute from '@/components/AdminRoute'

import Settings from "@/components/Settings"
import CreateCollection from '@/components/CreateCollection'
import MyCollections from "@/components/MyCollections"

import CollectionPage from "@/pages/CollectionPage"
import HomePage from "@/pages/HomePage"
import SignForm from "@/pages/SignForm"
import ErrorPage from "@/pages/ErrorPage"
import AdminPage from "@/pages/AdminPage"

const App = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path='*' element={<ErrorPage />} />
                    <Route index element={<HomePage />} />
                    <Route path='auth' element={<SignForm />} />
                    <Route path='collection/:id' element={<CollectionPage />} />
                    <Route path='collections/:id' element={<MyCollections />} />
                    <Route element={<PrivateRoute />}>
                        <Route path='/settings' element={<Settings />} />
                        <Route path='create' element={<CreateCollection />} />
                        <Route element={<AdminRoute />}>
                            <Route path='/admin' element={<AdminPage />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </ThemeProvider>
    )
}

export default App
