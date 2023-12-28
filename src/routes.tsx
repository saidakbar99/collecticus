import { createBrowserRouter, RouteObject } from "react-router-dom"
import App from './App'

const routes: RouteObject[] = [
  {
    path: '/',
    element: App(),
  },
]

const router = createBrowserRouter(routes)

export default router