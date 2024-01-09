import React, { useState, useEffect } from 'react'
import moment from 'moment'
import 'moment/locale/en-au'
import { Badge } from "@/components/ui/badge"

import UserService from '@/services/UserService'
import AdminActivityButton from '@/components/AdminActivityMenu'
import { User } from './Table/components/schema'

const AdminTable = () => {
    const [users, setUsers] = useState<User[]>([])
    const [isSelectedAll, setIsSelectedAll] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])

    const token = localStorage.getItem('token')

    const resetCheckboxes = () => {
        setSelectedUsers([])
        setIsSelectedAll(false)
    }

    const getUsers = async () => {
        try {
            if (token) {
                const response = await UserService.fetchUsers(token)
                setUsers(response.data)
                resetCheckboxes()
            }
        } catch (e) {
            console.error('Error fetching users: ', e)
        }
    }

    const handleSelectAll = () => {
        setIsSelectedAll(!isSelectedAll)
        setSelectedUsers(users.map(user => user._id))

        if (isSelectedAll) {
          setSelectedUsers([])
        }
    }

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target
        setSelectedUsers([...selectedUsers, id])

        if (!checked) {
          setSelectedUsers(selectedUsers.filter(item => item !== id))
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className="hidden h-full flex-1 flex-col space-y-8 px-8 pt-6 md:flex mt-[72px]">
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b">
                        <tr>
                            <th scope="col" className="px-4 py-3">
                                {/* <Checkbox
                                    checked={ isSelectedAll }
                                    onCheckedChange={ handleSelectAll }
                                /> */}
                                <input
                                    className="cursor-pointer"
                                    type="checkbox"
                                    checked={ isSelectedAll }
                                    onChange={ handleSelectAll }
                                />
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Last Login
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Created Data
                            </th>
                            <th scope="col" className="px-4 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: User ) => {
                            const isBlocked = user.isBlocked
                            const isAdmin = user.isAdmin
                            const status = isBlocked ? 'Blocked' : isAdmin ? 'Admin' : 'Active'
                            const badgeColor = isBlocked ? 'red' : isAdmin ? 'blue' : 'green'
                            return (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user._id}>
                                    <td scope="row" className="px-4 py-3">
                                        {/* <Checkbox
                                            checked={selectedUsers.includes(user._id)}
                                            // onCheckedChange={ (isChecked: boolean) => handleCheckbox(isChecked) }
                                        /> */}
                                        <input
                                            className="cursor-pointer"
                                            type="checkbox"
                                            id={user._id}
                                            checked={ selectedUsers.includes(user._id) }
                                            onChange={ handleCheckbox }
                                        />
                                    </td>
                                    <td scope="row" className="px-4 py-3">
                                        {user.username}
                                    </td>
                                    <td className="px-4 py-3">
                                        {user.email}
                                    </td>
                                    <td className="px-4 py-3">
                                        {moment(user.lastLogin).format('LLL')}
                                    </td>
                                    <td className="px-4 py-3">
                                        {moment(user.createdAt).format('L')}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge className={`bg-${badgeColor}-100 text-${badgeColor}-800`}>{status}</Badge>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <AdminActivityButton selectedUsers={selectedUsers} getUsers={getUsers} />
        </div>
    )
}

export default AdminTable
