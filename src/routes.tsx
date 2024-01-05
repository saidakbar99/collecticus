import { RouteObject } from "react-router-dom"
import CollectionPage from "./components/CollectionPage"
import ErrorPage from "./pages/ErrorPage"
import HomePage from "./components/HomePage"
import ItemPage from "./components/ItemPage"
import SignForm from "./pages/SignForm"
import AdminPage from "./components/Table/AdminPage"
import CreatePostPage from "./pages/CreatePostPage"
import ProfilePage from "./pages/ProfilePage"

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
        element: <AdminPage />
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
        element: <CreatePostPage />
    },
    {
        path: '/profile',
        element: <ProfilePage />
    },
]

export default routes