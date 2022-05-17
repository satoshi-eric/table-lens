import * as d3 from 'd3'
import { useEffect, useState } from 'react'
import BarChart from './BarChart'
import './TableLens.css'

const TableLens = () => {
    const url = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/iris.csv'
    const [data, setData] = useState(null)
    
    useEffect(() => {
        d3.csv(url).then(data => {
            setData(data)
        })
    }, [])

    if (!data) return <div>Loading...</div>

    const width = 2000
    const height = data.length * 10 + 50

    const tableLensStyle = {
        width: width,
        height: height,
        overflowX: 'scroll',
        border: '1px solid black'
    }

    return (
        <div style={tableLensStyle}>
            <BarChart name={data.columns[0]} width={200} height={height} series={data.map(d => d.sepal_length)}/>
            <BarChart name={data.columns[1]} width={200} height={height} series={data.map(d => d.sepal_width)}/>
            <BarChart name={data.columns[2]} width={200} height={height} series={data.map(d => d.petal_length)}/>
            <BarChart name={data.columns[3]} width={200} height={height} series={data.map(d => d.petal_width)}/>
            {/* <BarChart name={data.columns[4]} width={200} series={data.map(d => d.species)}/> */}
        </div>
    )
}

export default TableLens