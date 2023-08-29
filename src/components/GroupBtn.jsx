import {useState} from 'react'

const GroupBtn = ({label, filterHandler}) => {
    const [checked, setChecked] = useState(true)

    return (
        <label className={checked? `filter-btn active-btn` : `filter-btn`}>{label}<input type="checkbox" value={label} className="hide-control" defaultChecked={checked} onChange={e => {setChecked((state) => !state); filterHandler(e)}}/></label>
    )
}

export default GroupBtn