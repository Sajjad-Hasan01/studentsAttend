const SubmitButton = ({label}) => {
  return (
    <div className="form-field flex-between">
        <label className="chboxlbl"><input type="checkbox" className="checkbox"/>keep login</label>
        <button type="submit" className="btn">{label}</button>
    </div>
  )
}

export default SubmitButton