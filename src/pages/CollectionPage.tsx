import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { formatDistance } from 'date-fns/formatDistance'

import CollectionService, { FetchedCollections } from '@/services/CollectionService'
import ItemDialog from '@/components/ItemDialog'
import { useAppSelector } from '@/hooks/redux'
import ItemsActivityMenu from '@/components/ItemsActivityMenu'
import { FetchedItems } from '@/services/ItemService'
import { Badge } from '@/components/ui/badge'
// import {GridTable} from '@/components/agGridTable/GridTable'

// import mockData from './mock.json'

// import {
//     createColumnHelper,
//     flexRender,
//     getCoreRowModel,
//     useReactTable,
//     getSortedRowModel,
//     SortingState,
//     getPaginationRowModel
//   } from '@tanstack/react-table'
// import TablePagination from '@/components/TablePagination'

    // type Person = {
    //     id: number
    //     name: string
    //     email: string
    //     phone: string
    // }

    // const columnHelper = createColumnHelper<Person>()

    // const columns = [
    //     columnHelper.accessor('id', {
    //         cell: info => info.getValue(),
    //     }),
    //     columnHelper.accessor('name', {
    //         cell: info => info.getValue(),
    //     }),
    //     // you can use different aproach here
    //     columnHelper.accessor(row => row.email, {
    //         id: 'email',
    //         cell: info => <i>{info.getValue()}</i>,
    //         header: () => <span>Email</span>,
    //     }),
    //     columnHelper.accessor('phone', {
    //         header: () => 'Phone',
    //         cell: info => info.renderValue(),
    //     })
    // ]

const CollectionPage = () => {
    const location = useLocation()
    const { user } = useAppSelector(state => state.userReducer)

    const [isSelectedAll, setIsSelectedAll] = useState(false)
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [collection, setCollection] = useState<FetchedCollections>()

    const getCollection = async () => {
        try {
            const collectionId = location.pathname.split('/').slice(-1)[0]
            const response = await CollectionService.fetchOneCollection(collectionId)
            setCollection(response.data)
        } catch (e) {
            console.error('Error fetching collections: ', e)
        }
    }

    useEffect(() => {
        getCollection()
    }, [])

    if (!collection) {
        return <div></div>
    }

    const isOwner = collection.user._id === user.id || user.isAdmin

    const handleSelectAll = () => {
        setIsSelectedAll(!isSelectedAll)
        setSelectedItems(collection.items.map((item: FetchedItems) => item._id))

        if (isSelectedAll) {
          setSelectedItems([])
        }
    }

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target
        setSelectedItems([...selectedItems, id])

        if (!checked) {
          setSelectedItems(selectedItems.filter(item => item !== id))
        }
    }

    return (
        < >
            <div className='grid grid-cols-2 mt-[72px] p-12'>
                <div>
                    <p className='text-4xl'>{collection?.topic} Collection</p>
                    <p>{collection?.title}</p>
                    <p>{collection?.description}</p>
                    <p>
                        {formatDistance(
                            collection?.createdAt,
                            new Date(),
                            { addSuffix: true }
                        ) }
                    </p>
                    <p>{collection?.user.username}</p>
                    {isOwner && (
                        <ItemDialog outline={false} title='Add' getCollection={getCollection} collection={{...collection, items: []}} />
                    )}
                </div>
                <div className=''>
                    <img className='h-72 rounded-lg' src={collection.image_url ? collection.image_url : 'https://placehold.co/600x400?text=Collecticus'} alt='' />
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b">
                    <tr>
                        {isOwner && (
                            <th scope="col" className="px-4 py-3">
                                <input
                                    className="cursor-pointer"
                                    type="checkbox"
                                    checked={ isSelectedAll }
                                    onChange={ handleSelectAll }
                                />
                            </th>
                        )}
                        <th scope="col" className="px-4 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-4 py-3 text-center">
                            Tags
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Last Update
                        </th>
                        {isOwner && (
                            <th scope="col" className="px-4 py-3">
                                Action
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {collection.items.length ? collection.items.map((item) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item._id}>
                            {isOwner && (
                                <td scope="row" className="px-4 py-3">
                                    <input
                                        className="cursor-pointer"
                                        type="checkbox"
                                        id={item._id}
                                        checked={ selectedItems.includes(item._id) }
                                        onChange={ handleCheckbox }
                                    />
                                </td>
                            )}
                            <td scope="row" className="px-4 py-3">
                                {item.name}
                            </td>
                            <td className="px-4 py-3 max-w-48">
                                {item.tags.map((tag, index) => (
                                    <Badge key={index} className='ml-1'>
                                        {tag}
                                    </Badge>
                                ))}
                            </td>
                            <td className="px-4 py-3">
                                {formatDistance(
                                    item?.lastUpdate,
                                    new Date(),
                                    { addSuffix: true }
                                )}
                            </td>
                            {isOwner && (
                                <td className="px-4 py-3">
                                    <ItemDialog
                                        outline
                                        title='Edit'
                                        getCollection={getCollection}
                                        collection={collection}
                                        OldItem={item}
                                        itemId={item._id}
                                    />
                                </td>
                            )}
                        </tr>
                        )) : (
                            //! refactor
                            <div>no items</div>
                        )
                    }
                </tbody>
            </table>
            {/* <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr
                        key={headerGroup.id}
                        className="border-b uppercase"
                        >
                        {headerGroup.headers.map((header) => (
                            <th
                            key={header.id}
                            className="px-4 pr-2 py-4 font-medium text-left"
                            >
                            {header.isPlaceholder ? null : (
                                <div
                                {...{
                                    className: header.column.getCanSort()
                                    ? 'cursor-pointer select-none flex min-w-[36px]'
                                    : '',
                                    onClick: header.column.getToggleSortingHandler(),
                                }}
                                >
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                                {{
                                    asc: <span className="pl-2">↑</span>,
                                    desc: <span className="pl-2">↓</span>,
                                }[header.column.getIsSorted() as string] ?? null}
                                </div>
                            )}
                            </th>
                        ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="border-b">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="px-4 pt-[14px] pb-[18px]">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table> */}
            {/* <GridTable /> */}
            {/* <TablePagination table={table} /> */}
            <ItemsActivityMenu selectedItems={selectedItems} getCollection={getCollection} collectionId={collection._id} />
        </>
    )
}

export default CollectionPage
