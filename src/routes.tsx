import { RouteObject } from "react-router-dom"
import CollectionPage from "./components/CollectionPage"
import ErrorPage from "./pages/ErrorPage"
import HomePage from "./components/HomePage"
import ItemPage from "./components/ItemPage"
import SignForm from "./pages/SignForm"
// import AdminPage from "./components/Table/AdminPage"
// import CreatePostPage from "./pages/CreatePostPage"
import SettingsProfilePage from './components/forms/page'
import ProfilePage from "./pages/ProfilePage"
import AdminTable from "./components/AdminTable"

const routes: RouteObject[] = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/auth',
        element: <SignForm />
    },
    {
        path: '/admin',
        element: <AdminTable />
    },
    {
        path: '/collection/:id',
        element: <CollectionPage />
    },
    {
        path: '/item/:id',
        element: <ItemPage />
    },
    {
        path: '/create',
        element: <SettingsProfilePage />
    },
    {
        path: '/profile',
        element: <ProfilePage />
    },
    {
        path: '*',
        element: <ErrorPage />
    },
]

export default routes