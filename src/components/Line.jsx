const Line = ({ dataColumns, dataRow}) => {
    return <div>
        {
            dataColumns.map((column, i) => {
                return <div key={i}>{dataRow[column]}</div>
            })
        }
    </div>
}

export default Line