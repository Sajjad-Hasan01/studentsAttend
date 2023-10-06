const Warn = ({action, actionLabel, message, setToggle, warning}) => {
    return (
    <section className="modal-bg">
        <div className="alert">
            <div className="alert-message">
                {message}
            </div>
            <div className="form-field flex-between">
                <button type="button" className={warning?"secBtn":"secBtn danger"} onClick={()=>setToggle(false)}>cancle</button>
                <button type="button" className={warning?"btn danger":"btn"} onClick={()=>action()}>{actionLabel}</button>
            </div>
        </div>
    </section>
    )
}

export default Warn