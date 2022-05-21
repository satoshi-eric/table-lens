import React from "react"
import * as d3 from 'd3'
import Row from "./Row"

const TableLens = ({data}: {data: d3.DSVRowArray<string>}) => {

    const tableLensStyle: React.CSSProperties = {
        width: data.columns.length * 150 + "px",
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
        width: "150px",
        cursor: "pointer"
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
                    if (i === rows.length - 1) {
                        return <Row xScales={xScales} key={i} row={row} isLast={true}/>
                    }
                    return <Row xScales={xScales} key={i} row={row}/>
                })}
            </div>
        </div>
    )
}

export default TableLens