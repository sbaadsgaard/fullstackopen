import { useState } from 'react'

const Button = ({ text, handleClick }) => <button onClick={handleClick} >{text}</button>

const FeedbackOption = ({ option, count }) => <p>{option} {count}</p>

const StatisticsDisplay = ({ good, neutral, bad }) =>
  <div>
    <h1>statistics</h1>
    <FeedbackOption option = "good" count={good}/>
    <FeedbackOption option = "neutral" count={neutral}/>
    <FeedbackOption option = "bad" count={bad}/>

  </div>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleGood} />
      <Button text="neutral" handleClick={handleNeutral} />
      <Button text="bad" handleClick={handleBad} />
      <StatisticsDisplay good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App