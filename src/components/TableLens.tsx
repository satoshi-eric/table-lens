import React from "react"
import * as d3 from 'd3'
import Row from "./Row"

const TableLens = ({data}: {data: d3.DSVRowArray<string>}) => {

    // const tableLensStyle: React.CSSProperties = {
        
    // }

    const headerStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "row",
    }

    const bodyStyle: React.CSSProperties = {
        
    }

    const headerCellStyle: React.CSSProperties = {
        border: "1px solid black",
        padding: "5px",
        width: "150px"
    }

    const [columns, setColumns] = React.useState<Array<any>>([])
    const [rows, setRows] = React.useState<Array<any>>([])

    React.useEffect(() => {
        setColumns(data.columns)
        setRows(data.map(d => d))
    }, [data])

    const xScales: Array<d3.ScaleLinear<number, number, never>>  = columns.map((column, i) => {
        const domain: Array<number> = rows.map(row => +row[column])
        const [min, max] = [Math.min(...domain), Math.max(...domain)]
        let scale = null
        
        scale = d3.scaleLinear()
            .domain([min, max])
            .range([0, 100])

        if (isNaN(min) || isNaN(max)) {
            scale = d3.scaleLinear()
                .domain([0, 10])
                .range([0, 100])
        }
        if (scale) {
            return scale
        }
        return d3.scaleLinear().domain([0, 10]).range([0, 100])
    })  

    return (
        <div>
            <div style={headerStyle}>
                {columns.map((column, i) => {
                    return (
                        <div style={headerCellStyle} key={i}>
                            {column}
                        </div>
                    )
                })}
            </div>
            <div style={bodyStyle}>
                {rows.map((row, i) => {
                    return <Row xScales={xScales} key={i} row={row}/>
                })}
            </div>
        </div>
    )
}

export default TableLens