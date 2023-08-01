import { useState } from 'react'

const Button = ({ text, handleClick }) => <button onClick={handleClick} >{text}</button>

const Statistic = ({ name, value }) => <p>{name} {value}</p>

const StatisticsDisplay = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = total != 0 ? (good - bad) / total : 0
  const positive = good / total * 100
  return total > 0 ?
    (<div>
      <Statistic name="good" value={good} />
      <Statistic name="neutral" value={neutral} />
      <Statistic name="bad" value={bad} />
      <Statistic name="all" value={total} />
      <Statistic name="average" value={average} />
      <Statistic name="positive" value={`${positive} %`} />
    </div>
    ) : <p>No feedback given</p>
}
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
      <h1>statistics</h1>
      <StatisticsDisplay good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App