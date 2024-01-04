// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import moment from 'moment'
import 'moment/locale/en-au'

import { DataTableDemo } from './Table'

const AdminPage = () => {
    // const [users, setUsers] = useState([])
    // const [isSelectedAll, setIsSelectedAll] = useState(false)
    // const [isCheck, setIsCheck] = useState([])

    // const navigate = useNavigate()
    // const token = sessionStorage.getItem('token')

    // const resetCheckboxes = () => {
    //     setIsCheck([])
    //     setIsSelectedAll(false)
    // }

    // const getUsers = async () => {
    //     try {
    //         const response = await UserService.fetchUsers(token)
    //         setUsers(response.data)
    //         resetCheckboxes()
    //     } catch (e) {
    //         console.error('Error fetching users: ', e)
    //     }
    // }

    // const logout = async () => {
    //     await store.logout()
    //         .then(() => navigate('/'))
    // }

    // const deleteUser = async () => {
    //     try {
    //         await UserService.deleteUsers(isCheck)

    //         if (isCheck.includes(store.user.id)) {
    //             logout()
    //         }

    //         getUsers()
    //     } catch (error) {
    //         console.error('Error removing users:', error)
    //     }
    // }

    // const blockUser = async () => {
    //     try {
    //         await UserService.blockUsers(isCheck)

    //         if (isCheck.includes(store.user.id)) {
    //             logout()
    //         }

    //         getUsers()
    //     } catch (error) {
    //       console.error('Error removing users:', error)
    //     }
    // }

    // const unblockUser = async () => {
    //     try {
    //         await UserService.unblockUsers(isCheck)
    //         getUsers()
    //     } catch (error) {
    //       console.error('Error removing users:', error)
    //     }
    // }

    // const handleSelectAll = e => {
    //     setIsSelectedAll(!isSelectedAll)
    //     setIsCheck(users.map(user => user._id))

    //     if (isSelectedAll) {
    //       setIsCheck([])
    //     }
    // }

    // const handleCheckbox = (e:any) => {
    //     const { id, checked } = e.target
    //     setIsCheck([...isCheck, id])

    //     if (!checked) {
    //       setIsCheck(isCheck.filter(item => item !== id))
    //     }
    // }

    // useEffect(() => {
    //     if (!token) {
    //         navigate('/sign_in')
    //     }

    //     getUsers()
    // }, [token])

    return (
        <DataTableDemo />
    )
}

export default AdminPage
