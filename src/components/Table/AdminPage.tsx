import { useState, useEffect } from 'react'
// import { promises as fs } from "fs"
// import path from "path"
// import { z } from "zod"

import { TableColumns } from "./components/TableColumns"
import { DataTable } from "./components/data-table"
// import { taskSchema } from "./data/schema"
import UserService from '@/services/UserService'
import AdminActivityButton from './components/AdminActivityMenu'
// import MyLoader from '@/components/TableSkeleton'

// async function getTasks() {
//   // const data = await fs.readFile(
//   //   path.join(process.cwd(), "app/examples/tasks/data/tasks.json")
//   // )

//   // const tasks = JSON.parse(data.toString())

//   // return z.array(taskSchema).parse(tasks)
//   const response = await fetch('/data/tasks.json');
//   const tasks = await response.json();
//   return z.array(taskSchema).parse(tasks);
// }

// interface User {
//   username: string;
//   email: string;
// }

export default function TaskPage() {
    const [users, setUsers] = useState([])

    const token = localStorage.getItem('token')

    const getUsers = async () => {
        try {
            if (token) {
                const response = await UserService.fetchUsers(token)
                setUsers(response.data)
            }
        } catch (e) {
            console.error('Error fetching users: ', e)
        }
    }

        useEffect(() => {
            getUsers()
        }, [])

    return (
        <>
        {/* <div className="md:hidden">
            <img
            src="/examples/tasks-light.png"
            width={1280}
            height={998}
            alt="Playground"
            className="block dark:hidden"
            />
            <img
            src="/examples/tasks-dark.png"
            width={1280}
            height={998}
            alt="Playground"
            className="hidden dark:block"
            />
        </div> */}
        <div className="hidden h-full flex-1 flex-col space-y-8 px-8 pt-6 md:flex mt-[72px]">
            <DataTable data={users} columns={TableColumns} />
            <AdminActivityButton />
            {/* <MyLoader /> */}
            {/* <TableSkeleton /> */}
        </div>
        </>
    )
}
