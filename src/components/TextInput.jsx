const TextInput = ({label, placeholder, defaultValue, checkName, errorMessage}) => {
  return (
    <div className={errorMessage ? "form-field invalid" : "form-field"}>
        <label htmlFor={label}>{label}</label>
        <input type="text" className="input-field" name={label} id={label} placeholder={placeholder} defaultValue={defaultValue} spellCheck="false" onChange={e=>checkName(e.target.value)}/>
        {errorMessage && <span className="error-msg">{errorMessage}</span>}
    </div>
  )
}

export default TextInput