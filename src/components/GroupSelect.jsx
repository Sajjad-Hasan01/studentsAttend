const GroupSelect = ({defaultValue ,checkGroup, errorMessage}) => {

  return (
    <div className={errorMessage ? "form-field invalid" : "form-field"}>
        <label htmlFor="selectGroup">Group</label>
        <select className="input-field" id="selectGroup" name="group" defaultValue={defaultValue} onChange={(e)=>checkGroup(e.target.value)}>
            <option value="">select</option>
            <option value="a">a</option>
            <option value="b">b</option>
            <option value="c">c</option>
            <option value="d">d</option>
            <option value="e">e</option>
        </select>
        {errorMessage && <span className="error-msg">errorMessage</span>}
    </div>
  )
}

export default GroupSelect