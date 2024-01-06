import { useState } from 'react'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons"
import { Column } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
}

export function TableHeader<TData, TValue>({
    column,
    title,
}: DataTableColumnHeaderProps<TData, TValue>) {
    const [isDescSorted, setIsDescSorted] = useState(false)

    const handleClick = () => {
        setIsDescSorted(!isDescSorted)
        column.toggleSorting(isDescSorted)
    }

    if (!column.getCanSort()) {
        return <div>{title}</div>
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8"
            onClick={handleClick}
        >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
                <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
                <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
                <CaretSortIcon className="ml-2 h-4 w-4" />
            )}
        </Button>
    )
}
