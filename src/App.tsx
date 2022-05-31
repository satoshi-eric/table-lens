import React from 'react'
import * as d3 from 'd3'
import TableLens from './components/TableLens'
import Configurations from './components/Configurations'

const App = () => {
  const csvUrl = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/iris.csv'
  const [data, setData] = React.useState<d3.DSVRowArray<string>>()
  const [state, setState] = React.useState<boolean>(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [defaultHeight, setDefaultHeight] = React.useState(5)
  const [zoomHeight, setZoomHeight] = React.useState(30)
  const [width, setWidth] = React.useState(100)
  
  React.useEffect(() => {
    d3.csv(csvUrl).then(res => { setData(res) })
  }, [])


  if (!data) return <div style={{margin: "10px"}}>
    <input style={{marginBottom: "10px", width: "150px", display: "flex"}} type="button" value="Configurações" onClick={() => {setIsOpen(true)}} />
      <Configurations 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        defaultHeight={defaultHeight}
        setDefaultHeight={setDefaultHeight}
        zoomHeight={zoomHeight}
        setZoomHeight={setZoomHeight}
        setState={setState}
        state={state}
        setData={setData}
        width={width}
        setWidth={setWidth}
      />
    Loading...
  </div>
  
  return (
    <div style={{margin: "10px"}}>
      <input style={{marginBottom: "10px", width: "150px"}} type="button" value="Configurações" onClick={() => {setIsOpen(true)}} />
      <Configurations 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        defaultHeight={defaultHeight}
        setDefaultHeight={setDefaultHeight}
        zoomHeight={zoomHeight}
        setZoomHeight={setZoomHeight}
        setState={setState}
        state={state}
        setData={setData}
        width={width}
        setWidth={setWidth}
      />
      <TableLens data={data} defaultHeight={defaultHeight} zoomHeight={zoomHeight} width={width} />
    </div>
  );
}

export default App;
