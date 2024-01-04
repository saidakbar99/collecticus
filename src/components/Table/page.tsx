import { useState, useEffect } from 'react'
// import { promises as fs } from "fs"
// import path from "path"
// import { z } from "zod"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
// import { UserNav } from "./components/user-nav"
// import { taskSchema } from "./data/schema"
import UserService from '@/services/UserService'

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

const getUsers = async () => {
    try {
        const response = await UserService.fetchUsers()
        setUsers(response.data)
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
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex mt-12">
        <DataTable data={users} columns={columns} />
    </div>
    </>
)
}
