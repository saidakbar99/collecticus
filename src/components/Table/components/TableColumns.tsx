import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

import { User } from './schema'
import { TableHeader } from "./TableHeader"

export const TableColumns: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({ table }) => (
        <Checkbox
            checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="translate-y-[2px]"
        />
        ),
        cell: ({ row }) => (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-[2px] text-left"
        />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "username",
        header: ({ column }) => (
        <TableHeader column={column} title="Username" />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("username")}</div>,
        filterFn: (props) => {
            console.log('>>>', props)
            return true
        }
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
        <TableHeader column={column} title="Email" />
        ),
        cell: ({ row }) => {
        // const label = labels.find((label) => label.value === row.original.label)

        return (
            <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
                {row.getValue("email")}
            </span>
            </div>
        )
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
        <TableHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const isBlocked = row.original.isBlocked
            const isAdmin = row.original.isAdmin
            const status = isBlocked ? 'Blocked' : isAdmin ? 'Admin' : 'Active'
            const badgeColor = isBlocked ? 'red' : isAdmin ? 'blue' : 'green'

            return (
                <div className="flex items-center cursor-default">
                    <Badge className={`bg-${badgeColor}-100 text-${badgeColor}-800`}>{status}</Badge>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            console.log('>>>', id, value)
            return value.includes(row.getValue(id))
        },
    },
  // {
  //   accessorKey: "priority",
  //   header: ({ column }) => (
  //     <TableHeader column={column} title="Priority" />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("priority")
  //     )

  //     if (!priority) {
  //       return null
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
]
