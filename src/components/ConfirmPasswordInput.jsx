const ConfirmPasswordInput = ({checkRePassword, showPassword, setShowPassword, errorMessage}) => {

  return (
    <div className={errorMessage ? "form-field invalid" : "form-field"}>
        <label htmlFor="confirmPassword" >Confirm Password</label>
        <input type={!showPassword ? "password" : "text"} className="input-field" name="confirmPassword" placeholder="rewrite the password" onChange={e=>checkRePassword(e.target.value)}/>
        <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"} onClick={()=>setShowPassword(!showPassword)}></i>
        { errorMessage ? <span className="error-msg">errorMessage</span> : null }
    </div>
  )
}

export default ConfirmPasswordInput