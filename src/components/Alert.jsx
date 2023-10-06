const Alert = ({action, message}) => {
    return (
    <section className="modal-bg">
        <div className="alert">
            <div className="alert-message">
                {message}
            </div>
            <div className="form-field flex-between">
                <button type="button" className="btn" onClick={()=>action()}>ok</button>
            </div>
        </div>
    </section>
    )
}

export default Alert