import { useState } from 'react'

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({ text, value }) => {
  return (
  <tr>
    <th style={{textAlign: 'left'}}>{text}</th>
    <td style={{textAlign: 'center'}}>{value}</td>
  </tr>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props;
  const total = good + neutral + bad;
  const average = (good + 0 * neutral - bad) / total;
  const positive = good / total * 100 + '%';

  if (total > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='total' value={total} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={positive} />          
        </tbody>
      </table>
    )
  }

  return (
    <p>No feedback given</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    let nextGood = good + 1;
    setGood(nextGood);
  }

  const handleNeutralClick = () => {
    let nextNeutral = neutral + 1;
    setNeutral(nextNeutral);
  }

  const handleBadClick = () => {
    let nextBad = bad + 1;
    setBad(nextBad);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' onClick={handleGoodClick} />
      <Button text='neutral' onClick={handleNeutralClick} />
      <Button text='bad' onClick={handleBadClick} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
