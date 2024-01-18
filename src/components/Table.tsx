import { useState, useEffect } from 'react'
import { useReactTable, createColumnHelper } from '@tanstack/react-table'

import CollectionService from '@/services/CollectionService'
import { FetchedCollections } from '@/services/CollectionService'
import { FetchedItems } from '@/services/ItemService'


const Table = () => {
    const [collection, setCollection] = useState<FetchedCollections>()

    const columnHelper = createColumnHelper<FetchedItems>()

    const defaultColumns = [
        // Display Column
        columnHelper.display({
          id: 'actions',
          cell: props => <RowActions row={props.row} />,
        }),
        // Grouping Column
        columnHelper.group({
          header: 'Name',
          footer: props => props.column.id,
          columns: [
            // Accessor Column
            columnHelper.accessor('name', {
              cell: info => info.getValue(),
              footer: props => props.column.id,
            }),
            // Accessor Column
            columnHelper.accessor(row => row.name, {
              id: 'name',
              cell: info => info.getValue(),
              header: () => <span>Last Name</span>,
              footer: props => props.column.id,
            }),
          ],
        }),
        // Grouping Column
        columnHelper.group({
          header: 'Info',
          footer: props => props.column.id,
          columns: [
            // Accessor Column
            columnHelper.accessor('tags', {
              header: () => 'Tags',
              footer: props => props.column.id,
            }),
            // Grouping Column
            // columnHelper.group({
            //   header: 'More Info',
            //   columns: [
            //     // Accessor Column
            //     columnHelper.accessor('visits', {
            //       header: () => <span>Visits</span>,
            //       footer: props => props.column.id,
            //     }),
            //     // Accessor Column
            //     columnHelper.accessor('status', {
            //       header: 'Status',
            //       footer: props => props.column.id,
            //     }),
            //     // Accessor Column
            //     columnHelper.accessor('progress', {
            //       header: 'Profile Progress',
            //       footer: props => props.column.id,
            //     }),
            //   ],
            // }),
          ],
        }),
      ]

    const table = useReactTable({ defaultColumns, data })


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

    return (
        <div>
            
        </div>
    )
}

export default Table;
