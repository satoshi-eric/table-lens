import React from 'react'
import * as d3 from 'd3'
import TableLens from './components/TableLens'

const App = () => {
  const csvUrl = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/iris.csv'
  // const csvUrl = 'https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv'
  const [data, setData] = React.useState<d3.DSVRowArray<string>>()
  const [state, setState] = React.useState<boolean>(false)
  
  React.useEffect(() => {
    d3.csv(csvUrl).then(res => { setData(res) })
  }, [])

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = event.target.files
    if (files && files[0]) {
      files[0].text().then(
        res => setData(d3.csvParse(res))
      )
    }
    setState(!state)
  }

  if (!data) return <div>Loading...</div>
  
  return (
    <div>
      <input type="file" name="file" id="file" onChange={uploadFile} />
      <TableLens data={data}/>
    </div>
  );
}

export default App;
