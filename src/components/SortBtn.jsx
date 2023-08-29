import {useState} from 'react'

const SortBtn = ({sortHandler}) => {
    const [checked, setChecked] = useState(true)

    return (
        <div className="sortCon">
            <label className={checked? `filter-btn active-btn` : `filter-btn`}>a-z &#x2193;<input type="radio" name="sort" value='ASC' className="hide-control" defaultChecked={checked} onChange={e => {setChecked((state) => !state); sortHandler(e)}}/></label>
            <label className={checked? `filter-btn` : `filter-btn active-btn`}>z-a &#x2191;<input type="radio" name="sort" value='DESC' className="hide-control" onChange={e => {setChecked((state) => !state); sortHandler(e)}}/></label>
        </div>
    )
}

export default SortBtn