import { useState } from "react"

const StatusBtn = ({label, filterHandler}) => {
    const [checked, setChecked] = useState(true)

    return (
        <label className={checked? `filter-btn ${label}` : `filter-btn`}>{label} <input type="checkbox" value={label} className="hide-control" defaultChecked={checked} onChange={e => {setChecked((state) => !state); filterHandler(e)}}/></label>
    )
}

export default StatusBtn