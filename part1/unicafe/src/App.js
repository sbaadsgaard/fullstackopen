import { useState } from 'react'

const Button = ({ text, handleClick }) => <button onClick={handleClick} >{text}</button>

const StatisticLine = ({ name, value }) =>
  <tr><td>{name}</td><td>{value}</td></tr>

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  if (total == 0) {
    return <p>No feedback given</p>
  }
  const average = (good - bad) / total
  const positive = good / total * 100
  return (<table>
    <tbody>
      <StatisticLine name="good" value={good} />
      <StatisticLine name="neutral" value={neutral} />
      <StatisticLine name="bad" value={bad} />
      <StatisticLine name="all" value={total} />
      <StatisticLine name="average" value={average} />
      <StatisticLine name="positive" value={`${positive} %`} />
    </tbody>
  </table>
  )
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App