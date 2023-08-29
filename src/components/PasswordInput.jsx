const PasswordInput = ({checkPassword,  showPassword, setShowPassword, errorMessage}) => {

  return (
    <div className={errorMessage ? "form-field invalid" : "form-field"}>
      <label htmlFor="password" >Password</label>
      <input type={!showPassword ? "password" : "text"} className="input-field" name="password" placeholder="your password" onChange={e=>checkPassword(e.target.value)}/>
      <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"} onClick={()=>setShowPassword(!showPassword)}></i>
      { errorMessage ? <span className="error-msg">{errorMessage}</span> : null }
    </div>
  )
}

export default PasswordInput