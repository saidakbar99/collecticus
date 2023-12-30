import { createBrowserRouter, RouteObject } from "react-router-dom"
import App from './App'
import SignForm from "./components/SignForm"
import { UserAuthForm } from "./components/UserAuthForm"

const routes: RouteObject[] = [
  {
    path: '/',
    element: App(),
  },
  {
    path: '/auth',
    element: <UserAuthForm />
  }
]

const router = createBrowserRouter(routes)

export default router