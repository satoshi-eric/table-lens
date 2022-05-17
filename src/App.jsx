import TableLens from "./components/TableLens";
import * as d3 from 'd3'
import { useEffect, useState } from "react";
import pokemon from './data/dummyData'

const App = () => {
  const csvUrl = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/iris.csv'
  const [data, setData] = useState(null)
  useEffect(() => {
    d3.csv(csvUrl)
      .then((res) => { setData(res) })
      .catch(err => { setData(pokemon) })
  }, [])
  if (!data) return <div>Carregando</div>
  return <TableLens data={data} />
}

export default App;
