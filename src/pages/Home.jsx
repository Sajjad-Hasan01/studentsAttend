import {date, hours, minutes, session} from '../assets/js/displayTime'

const Home = () => {
  return (
    <main>
    <header>
        <div>
            <div className="title">
                <h1>students' attendance</h1>
                <p>check who didn't attend</p>
            </div>
            <div className="datetime">
                <div className="date">{date}</div>
                <div className="time">
                    <span id="hours">{hours}</span>
                    <span>:</span>
                    <span id="minutes">{minutes}</span>
                    <span id="session"> {session}</span>
                </div>
            </div>
        </div>
    </header>
    </main>
  )
}

export default Home