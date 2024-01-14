import { Outlet, Navigate } from 'react-router-dom'

import { useAppSelector } from "@/hooks/redux"

const PrivateRoute = () => {
    const { isAuth } = useAppSelector(state => state.userReducer)

    return isAuth ? <Outlet /> : <Navigate to="/auth" />
}

export default PrivateRoute