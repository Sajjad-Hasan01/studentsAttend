import {Link} from 'react-router-dom'

const Error = () => {
  return (
    <main>
      <div className="error-container">
        <h1>Error</h1>
        <Link to='/'>Back to home</Link>
      </div>
    </main>
  )
}

export default Error