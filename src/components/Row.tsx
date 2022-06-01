import React from "react"
import * as d3 from 'd3'

interface rowProps {
    row: object, 
    xScales: Array<d3.ScaleLinear<number, number, never> | d3.ScaleBand<string>>, 
    isLast?: boolean,
    defaultHeight: number,
    zoomHeight: number,
    width: number
}

const Row = ({ row, xScales, isLast, defaultHeight = 5, zoomHeight = 30, width = 150 }: rowProps) => {

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
        width: `${width}px`,
        position: "relative",
        boxSizing: "border-box",
        overflow: "hidden"
    }

    const cellStyleClicked: React.CSSProperties = {
        display: "flex",
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
        padding: "0px 5px",
        width: `${width}px`,
        position: "relative",
        boxSizing: "border-box",
        overflow: "hidden"
    }

    const barStyle = (scale: d3.ScaleLinear<number, number> | d3.ScaleBand<string>, value: any): React.CSSProperties => {
        const isCategorical = isNaN(+value)
        if (isCategorical) {
            return {
                width: `${100/scale.domain().length}%`,
                height: `${defaultHeight}px`,
                marginLeft: `${scale(value)}%`,
                backgroundColor: "#4284f5"
            }
        }
        return {
            width: `${scale(value)}%`,
            height: `${defaultHeight}px`,
            backgroundColor: "#4284f5",
            color: "black",
        }
    }

    const barStyleClicked = (scale: d3.ScaleLinear<number, number> | d3.ScaleBand<string>, value: any): React.CSSProperties => {
        const isCategorical = isNaN(+value)
        if (isCategorical) {
            return {
                width: `${100/scale.domain().length}%`,
                height: `${zoomHeight}px`,
                marginLeft: `${scale(value)}%`,
                backgroundColor: "#4284f5",
            }
        }
        return {
            width: `${scale(value)}%`,
            height: `${zoomHeight}px`,
            backgroundColor: "#4284f5",
            color: "black",
        }
    }

    const [mouseEnter, setMouseEnter] = React.useState<boolean>(false)
    
    const bars = Object.values(row).map((value, i) => {
        return <div style={mouseEnter ? cellStyleClicked : cellStyle} key={i}>
            <div style={{position: "absolute", userSelect: "none", overflow: "hidden"}}>
                {mouseEnter ? value : ""}
            </div>
            <div 
                style={mouseEnter ? barStyleClicked(xScales[i], value) : barStyle(xScales[i], value)} 
            >
                
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