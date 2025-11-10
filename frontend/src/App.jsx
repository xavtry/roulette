import React, { useState } from "react";
import RouletteTable from "./components/RouletteTable.jsx";

export default function App() {
  const [balance, setBalance] = useState(1000);
  const [history, setHistory] = useState([]);

  const handleSpin = (result, betAmount, win) => {
    setHistory((prev) => [...prev, { result, betAmount, win }]);
    setBalance((prev) => prev + win);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Roulette Royale</h1>
      <h2>Balance: ${balance}</h2>
      <RouletteTable balance={balance} onSpin={handleSpin} />
      <div style={{ marginTop: "20px" }}>
        <h3>History</h3>
        <ul>
          {history.slice(-10).map((h, i) => (
            <li key={i}>
              Spin: {h.result}, Bet: ${h.betAmount}, {h.win >= 0 ? `Won $${h.win}` : `Lost $${-h.win}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
