import React from "react"
import * as d3 from 'd3'

const Row = ({ row, xScales }: {row: object, xScales: Array<d3.ScaleLinear<number, number, never>>}) => {

    const rowStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "row",
    }

    const cellStyle: React.CSSProperties = {
        display: "flex",
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
        padding: "0px 5px",
        width: "150px",
    }

    const cellStyleClicked: React.CSSProperties = {
        display: "flex",
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
        padding: "0px 5px",
        width: "150px",
    }

    const barStyle = (width: number): React.CSSProperties => {
        return {
            width: `${width}%`,
            height: "5px",
            backgroundColor: "blue",
            color: "white",
        }
    }

    const barStyleClicked = (width: number): React.CSSProperties => {
        return {
            width: `${width}%`,
            height: "30px",
            backgroundColor: "blue",
            color: "white",
        }
    }

    const [click, setClick] = React.useState<boolean>(false)
    
    const bars = Object.values(row).map((value, i) => {
        return <div style={click ? cellStyleClicked : cellStyle} key={i}>
            <div 
                style={click ? barStyleClicked(xScales[i](value)) : barStyle(xScales[i](value))} 
                
            >
                {click ? value : ""}
            </div>
        </div>
    })

    return <div style={rowStyle} onClick={() => {setClick(!click)}}>
        {bars}
    </div>
}

export default Row