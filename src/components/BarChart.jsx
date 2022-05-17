import React, { useState } from "react";
import Bar from "./Bar";
import * as d3 from 'd3'
import './BarChart.css'

const BarChart = (props) => {
    const [ series, setSeries ] = useState(props.series.map(d => +d))
    const xScale = d3.scaleLinear()
        .domain([0, parseFloat(d3.max(series))])
        .range([0, props.width])
    
    const bars = series.map((d, i) => {
        return <Bar key={i} d={d} i={10*i} width={xScale(d)}/>
    })


    return <svg height={props.height} width={props.width}>
        {bars}
    </svg>
}

export default BarChart