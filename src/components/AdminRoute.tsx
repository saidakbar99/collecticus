import { Outlet, Navigate } from 'react-router-dom'

import { useAppSelector } from '@/hooks/redux'

const AdminRoute = () => {
    const { user: {
        isAdmin
    } } = useAppSelector(state => state.userReducer)

    return isAdmin ? <Outlet /> : <Navigate to='/' />
}

export default AdminRoute