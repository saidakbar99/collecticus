import { RouteObject } from "react-router-dom"
import Home from "./components/Home"
import SignForm from "./components/SignForm"

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/auth',
    element: <SignForm />
  }
]

export default routes