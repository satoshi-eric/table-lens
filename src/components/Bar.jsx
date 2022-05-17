import { useState } from "react"

const Bar = ({d, i, width}) => {
    const [height, setHeight] = useState(10)
    const [zoom, setZoom] = useState(false)

    return <rect
        x={0}
        y={i}
        width={width}
        height={height}
        fill='royalblue'
        onClick={() => {
            setZoom(!zoom)
            if (zoom) setHeight(1)
            else setHeight(10)
            console.log(i)
        }}
    />
}

export default Bar