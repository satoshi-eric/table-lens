import React from "react"
import * as d3 from 'd3'
import Row from "./Row"
import calcPearsonCorrelation from "../utils/statistics"

interface tableLensProps {
    columnNames: Array<string>,
    data: Array<any>,
    defaultHeight: number,
    zoomHeight: number,
    width: number,
}

const TableLens = ({columnNames, data, defaultHeight = 5, zoomHeight = 30, width = 150}: tableLensProps) => {

    const tableLensStyle: React.CSSProperties = {
        width: columnNames.length * width + "px",
    }

    const headerStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "row",
        userSelect: "none"
    }

    const bodyStyle: React.CSSProperties = {
        
    }

    const headerCellStyle: React.CSSProperties = {
        border: "1px solid black",
        padding: "5px",
        width: `${width}px`,
        cursor: "pointer",
        boxSizing: "border-box",
        overflow: "hidden",
        backgroundColor: "white"
    }

    const selectedHeaderCellStyle: React.CSSProperties = {
        border: "1px solid black",
        padding: "5px",
        width: `${width}px`,
        cursor: "pointer",
        boxSizing: "border-box",
        overflow: "hidden",
        backgroundColor: "yellow",
    }

    const [columns, setColumns] = React.useState<Array<any>>([])
    const [rows, setRows] = React.useState<Array<any>>([])
    const [state, setState] = React.useState<boolean>(false)
    const [selectedColumn, setSelectedColumn] = React.useState<string>("")

    React.useEffect(() => {
        setColumns(columnNames)
        setRows(data.map(d => d))
    }, [data])

    const xScales: Array<d3.ScaleLinear<number, number, never> | d3.ScaleBand<string>>  = columns.map((column, i) => {
        const domain: Array<number> = rows.map(row => +row[column])
        const [min, max] = [Math.min(...domain), Math.max(...domain)]
        let scale = null

        if (isNaN(min) || isNaN(max)) {
            scale = d3.scaleBand()
                .domain(rows.map(row => row[column]).sort())
                .range([0, 100])
            return scale
        }
        
        scale = d3.scaleLinear()
            .domain([min, max])
            .range([0, 100])

        
        if (scale) {
            return scale
        }
        return d3.scaleLinear().domain([0, 10]).range([0, 100])
    })

    const sortRows = (event: React.SyntheticEvent) => {
        const target = event.target as HTMLInputElement
        const column = target.id
        const isCategorical = isNaN(+rows[0][column])
        const sortedRows = rows.sort((a, b) => {
            if (isCategorical) {
                return a[column] > b[column] ? 1 : -1
            }
            return a[column] - b[column]
        })
        setState(!state)
        setRows(sortedRows)
    }

    const sortColumns = (event: React.SyntheticEvent) => {
        event.stopPropagation()
        const target = event.target as HTMLInputElement
        const currentColumnId = target.id
        const columnsCorrelation = columns.map((column, i) => {
            const otherColumn = rows.map(row => +row[column])
            const currentColumn = rows.map(row => +row[currentColumnId])
            return {
                column,
                correlation: calcPearsonCorrelation(currentColumn, otherColumn)
            }
        })
        const sortedCorrelations = columnsCorrelation
            .sort((a, b) => {
                if (isNaN(a.correlation) || isNaN(b.correlation)) {
                    return a.column > b.column ? 1 : -1
                }
                return b.correlation - a.correlation
            })
            .map(column => column.column)
        setColumns(sortedCorrelations)
        const sortedRows = rows.map(row => {
            const newRow = Object()
            sortedCorrelations.forEach(column => {
                newRow[column] = row[column]
            })
            return newRow
        })
        setRows(sortedRows)
    }

    const headerCells = columns.map((column, i) => {
        return (
            <div 
                title={column} 
                style={column === selectedColumn ? selectedHeaderCellStyle : headerCellStyle} 
                id={column} 
                key={i} 
                onClick={(event) => {sortRows(event); setColor(event, column)}}
            >
                {column}
                <button id={column} onClick={sortColumns}>Correlação</button>
            </div>
        )
    })

    const setColor = (event: React.SyntheticEvent, column: string) => {
        setSelectedColumn(column)
    }

    return (
        <div style={tableLensStyle}>
            <div style={headerStyle}>
                {headerCells}
            </div>
            <div style={bodyStyle}>
                {rows.map((row, i) => {
                    if (i === rows.length - 1) {
                        return <Row 
                            xScales={xScales} 
                            key={i} row={row} 
                            isLast={true} 
                            defaultHeight={defaultHeight} 
                            zoomHeight={zoomHeight} 
                            width={width}
                        />
                    }
                    if (Object.values(row).every(r => r !== null && r !== undefined && r !== "")) {
                        return <Row 
                            xScales={xScales} 
                            key={i} row={row} 
                            defaultHeight={defaultHeight} 
                            zoomHeight={zoomHeight} 
                            width={width}
                        />
                    }
                })}
            </div>
        </div>
    )
}

export default TableLens