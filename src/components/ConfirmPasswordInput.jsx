const ConfirmPasswordInput = ({checkRePassword, rePasswordValid, showPassword, setShowPassword}) => {

  return (
    <div className={rePasswordValid ? "form-field" : "form-field invalid"} id="confirmPasswordField">
        <label htmlFor="confirmPassword" >Confirm Password</label>
        <input type={!showPassword ? "password" : "text"} className="input-field" name="confirmPassword" placeholder="rewrite the password" onChange={e=>checkRePassword(e.target.value)}/>
        <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"} onClick={()=>setShowPassword(!showPassword)}></i>
        { !rePasswordValid ? <span className="error-msg">password doesn't match</span> : null }
    </div>
  )
}

export default ConfirmPasswordInput