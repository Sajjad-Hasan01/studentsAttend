const SubmitButton = ({label, setKeepLogin}) => {
  return (
    <div className="form-field flex-between">
        <label className="chboxlbl"><input type="checkbox" className="checkbox" onChange={ e => setKeepLogin(e.target.checked) }/>keep login</label>
        <button type="submit" className="btn">{label}</button>
    </div>
  )
}

export default SubmitButton