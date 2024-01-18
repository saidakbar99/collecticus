import { useState, useEffect, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import "ag-grid-community/styles/ag-grid.css"
import 'ag-grid-community/styles/ag-theme-quartz.css';
// import 'ag-grid-community/styles/ag-theme-quartz-dark.css';

export const GridTable = () => {
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([
        {
            field: "mission",
            headerCheckboxSelection: true,
            checkboxSelection: true,
            showDisabledCheckboxes: true,
        },
        { field: "company" },
        { field: "location" },
        { field: "date" },
        // { field: "price", valueFormatter: params => { return '£' + params.value.toLocaleString(); } },
        { field: "rocket" }
    ]);


    // for all columns
    const defaultColDef = useMemo(() => ({
        filter: true,
        editable: true,
        flex: 1,
        minWidth: 100,
    }), [])

    useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/space-mission-data.json') // Fetch data from server
        .then(result => result.json()) // Convert to JSON
        .then(rowData => setRowData(rowData)); // Update state of `rowData`
    }, [])
    return (
        <div className="ag-theme-quartz" style={{ height: 500 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                onCellValueChanged={event => console.log(`New Cell Value: ${event.value}`)}
            />
        </div>
    )
}