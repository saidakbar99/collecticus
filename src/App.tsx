import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/ui/theme-provider"

import './App.css'
import MainLayout from "@/components/MainLayout"
import ItemPage from "@/components/ItemPage"
import CollectionPage from "@/pages/CollectionPage"
import ErrorPage from "@/pages/ErrorPage"
import HomePage from "@/pages/HomePage"
import SignForm from "@/pages/SignForm"
import CreateCollectionPage from '@/pages/CreateCollectionPage'
import ProfilePage from "@/pages/ProfilePage"
import AdminPage from "@/pages/AdminPage"
// import MyCollectionsPage from "@/pages/MyCollectionsPage"

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
                    <Route path='create' element={<CreateCollectionPage />} />
                    <Route path='profile' element={<ProfilePage />} />
                    <Route path='*' element={<ErrorPage />} />
                </Route>
            </Routes>
        </ThemeProvider>
    )
}

export default App
