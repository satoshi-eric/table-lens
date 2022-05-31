import React from "react"
import * as d3 from 'd3'
import Row from "./Row"

interface tableLensProps {
    data: d3.DSVRowArray<string>,
    defaultHeight: number,
    zoomHeight: number,
    width: number,
}

const TableLens = ({data, defaultHeight = 5, zoomHeight = 30, width = 150}: tableLensProps) => {

    const tableLensStyle: React.CSSProperties = {
        width: data.columns.length * width + "px",
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
    }

    const [columns, setColumns] = React.useState<Array<any>>([])
    const [rows, setRows] = React.useState<Array<any>>([])
    const [state, setState] = React.useState<boolean>(false)

    React.useEffect(() => {
        setColumns(data.columns)
        setRows(data)
    }, [data, state])

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
        const column = target.innerText
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

    return (
        <div style={tableLensStyle}>
            <div style={headerStyle}>
                {columns.map((column, i) => {
                    return (
                        <div style={headerCellStyle} key={i} onClick={sortRows}>
                            {column}
                        </div>
                    )
                })}
            </div>
            <div style={bodyStyle}>
                {rows.map((row, i) => {
                    if (Object.values(row).every(r => r !== null && r !== undefined && r !== "")) {
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