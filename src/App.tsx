import React from 'react'
import * as d3 from 'd3'
import TableLens from './components/TableLens'

const App = () => {
  const csvUrl = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/iris.csv'
  const [data, setData] = React.useState<d3.DSVRowArray<string>>()
  React.useEffect(() => {
    d3.csv(csvUrl).then(res => { setData(res) })
  }, [])

  if (!data) return <div>Loading...</div>
  
  return (
    <TableLens data={data}/>
  );
}

export default App;
