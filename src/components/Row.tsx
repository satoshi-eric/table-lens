import React from "react"
import * as d3 from 'd3'

const Row = ({ row, xScales, isLast }: {row: object, xScales: Array<d3.ScaleLinear<number, number, never>>, isLast?: boolean}) => {

    const rowStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "row"
    }

    const cellStyle: React.CSSProperties = {
        display: "flex",
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
        borderBottom: isLast ? "1px solid black" : "none",
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
            backgroundColor: "#4284f5",
            color: "black",
        }
    }

    const barStyleClicked = (width: number): React.CSSProperties => {
        return {
            width: `${width}%`,
            height: "30px",
            backgroundColor: "#4284f5",
            color: "black",
        }
    }

    const [mouseEnter, setMouseEnter] = React.useState<boolean>(false)
    
    const bars = Object.values(row).map((value, i) => {
        return <div style={mouseEnter ? cellStyleClicked : cellStyle} key={i}>
            <div 
                style={mouseEnter ? barStyleClicked(xScales[i](value)) : barStyle(xScales[i](value))} 
            >
                {mouseEnter ? value : ""}
            </div>
        </div>
    })

    return (
        <div 
            style={rowStyle} 
            onMouseEnter={() => {setMouseEnter(true)}} 
            onMouseLeave={() => {setMouseEnter(false)}}
        >
            {bars}
        </div>
    )
}

export default Row