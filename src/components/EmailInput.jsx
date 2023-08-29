const EmailInput = ({checkEmail, errorMessage}) => {

  return (
    <div className={errorMessage ? "form-field invalid" : "form-field"}>
        <label htmlFor="email" >Email</label>
        <input type="email" className="input-field" name="email" id="email" placeholder="user@domain.com" spellCheck="false" onChange={e=>checkEmail(e.target.value)}/>
        {errorMessage && <span className="error-msg">{errorMessage}</span>}
    </div>
  )
}

export default EmailInput