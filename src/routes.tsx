import { RouteObject } from "react-router-dom"
// import AdminPage from "./components/AdminPage"
import HomePage from "./components/HomePage"
import SignForm from "./components/SignForm"
import AdminPage from "./components/Table/page"

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/auth',
    element: <SignForm />
  },
  // {
  //   path: '/admin',
  //   element: <AdminPage />
  // },
  {
    path: '/admin',
    element: <AdminPage />
  }
]

export default routes