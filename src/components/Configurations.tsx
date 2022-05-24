import * as d3 from 'd3'
import Modal from 'react-modal'
import Draggable from 'react-draggable'

interface configurationsProps {
    isOpen: boolean,
    setIsOpen: Function,
    defaultHeight: number,
    setDefaultHeight: Function,
    zoomHeight: number,
    setZoomHeight: Function,
    setState: Function,
    data: d3.DSVRowArray<string>,
    setData: Function,
    state: boolean,
    width: number,
    setWidth: Function
}

const Configurations = ({
    isOpen,
    setIsOpen,
    defaultHeight,
    setDefaultHeight,
    zoomHeight,
    setZoomHeight,
    setState,
    data,
    setData,
    state,
    width,
    setWidth
  }: configurationsProps) => {

    const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
      let files = event.target.files
      if (files && files[0]) {
        files[0].text().then(
          res => setData(d3.csvParse(res))
        )
      }
      setState(!state)
    }

    return (
      
        <Modal 
          isOpen={isOpen} 
          onRequestClose={() => setIsOpen(false)}
          style={{content: {
            width: '40%', 
            height: '40%'
          }}}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start'
          }}>
            <label style={{margin: "3px"}} htmlFor="">Arquivo: </label>
            <input style={{margin: "3px", width: "60%"}} type="file" onChange={uploadFile} />
            <label style={{margin: "3px"}} htmlFor="">Largura:</label>
            <input style={{margin: "3px", width: "60%"}} type="number" value={width} onChange={(event) => setWidth(event.target.value)} />
            <label style={{margin: "3px"}} htmlFor="">Altura:</label>
            <input style={{margin: "3px", width: "60%"}} type="number" value={defaultHeight} onChange={(event) => {setDefaultHeight(event.target.value)}} />
            <label style={{margin: "3px"}} htmlFor="">Altura Zoom:</label>
            <input style={{margin: "3px", width: "60%"}} type="number" value={zoomHeight} onChange={(event) => {setZoomHeight(event.target.value)}} />
            <input style={{margin: "3px"}} type="button" value="Sair" onClick={() => {setIsOpen(false)}} />
          </div>
        </Modal>
    )
}

export default Configurations