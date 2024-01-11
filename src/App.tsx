import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/ui/theme-provider"

import './App.css'
import MainLayout from "@/components/MainLayout"
import ProfileLayout from '@/components/ProfileLayout'

import ItemPage from "@/components/ItemPage"
import Settings from "@/components/Settings"
import CreateCollection from '@/components/CreateCollection'
import MyCollections from "@/components/MyCollections"

import CollectionPage from "@/pages/CollectionPage"
import ErrorPage from "@/pages/ErrorPage"
import HomePage from "@/pages/HomePage"
import SignForm from "@/pages/SignForm"
import AdminPage from "@/pages/AdminPage"

const App = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path='auth' element={<SignForm />} />
                    <Route path='admin' element={<AdminPage />} />
                    <Route path='collection/:id' element={<CollectionPage />} />
                    <Route path='item/:id' element={<ItemPage />} />
                    <Route path="profile" element={<ProfileLayout />}>
                        <Route path='settings' element={<Settings />} />
                        <Route path='create' element={<CreateCollection />} />
                        <Route path='collections' element={<MyCollections />} />
                    </Route>
                    <Route path='*' element={<ErrorPage />} />
                </Route>
            </Routes>
        </ThemeProvider>
    )
}

export default App
