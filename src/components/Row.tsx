import React from "react"
import * as d3 from 'd3'

interface rowProps {
    row: object, 
    xScales: Array<d3.ScaleLinear<number, number, never> | d3.ScaleBand<string>>, 
    isLast?: boolean
}

const Row = ({ row, xScales, isLast }: rowProps) => {

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
        position: "relative"
    }

    const cellStyleClicked: React.CSSProperties = {
        display: "flex",
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
        borderTop: "1px solid black",
        borderBottom: "1px solid black",
        padding: "0px 5px",
        width: "150px",
        position: "relative"
    }

    const barStyle = (scale: d3.ScaleLinear<number, number> | d3.ScaleBand<string>, value: any): React.CSSProperties => {
        const isCategorical = isNaN(+value)
        if (isCategorical) {
            return {
                width: `${100/scale.domain().length}%`,
                height: "5px",
                marginLeft: `${scale(value)}%`,
                backgroundColor: "#4284f5"
            }
        }
        return {
            width: `${scale(value)}%`,
            height: "5px",
            backgroundColor: "#4284f5",
            color: "black",
        }
    }

    const barStyleClicked = (scale: d3.ScaleLinear<number, number> | d3.ScaleBand<string>, value: any): React.CSSProperties => {
        const isCategorical = isNaN(+value)
        if (isCategorical) {
            return {
                width: `${100/scale.domain().length}%`,
                height: "30px",
                marginLeft: `${scale(value)}%`,
                backgroundColor: "#4284f5"
            }
        }
        return {
            width: `${scale(value)}%`,
            height: "30px",
            backgroundColor: "#4284f5",
            color: "black",
        }
    }

    const [mouseEnter, setMouseEnter] = React.useState<boolean>(false)
    
    const bars = Object.values(row).map((value, i) => {
        return <div style={mouseEnter ? cellStyleClicked : cellStyle} key={i}>
            <div style={{position: "absolute"}}>
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