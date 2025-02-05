/* eslint-disable react/prop-types */
import { useState } from "react";

const Feedback = ({ fb }) => {
  return <h1>{fb}</h1>;
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}:</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total || 0;
  const positivePercentage = (good / total) * 100 || 0;

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total reviews" value={total} />
          <StatisticLine text="Average score" value={average} />
          <StatisticLine
            text="Positive feedback percentage"
            value={positivePercentage}
          />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const fbtext = "give feedback";
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoods = () => {
    setGood((prevGood) => prevGood + 1);
  };

  const handleNeutrals = () => {
    setNeutral((prevNeutral) => prevNeutral + 1);
  };

  const handleBad = () => {
    setBad((prevBad) => prevBad + 1);
  };

  return (
    <div>
      <Feedback fb={fbtext} />
      <button onClick={handleGoods}>Good</button>
      <button onClick={handleNeutrals}>Neutral</button>
      <button onClick={handleBad}>Bad</button>
      {good + bad + neutral === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} />
      )}
    </div>
  );
};

export default App;
