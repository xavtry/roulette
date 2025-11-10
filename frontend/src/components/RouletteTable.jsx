import React, { useState, useRef } from "react";

const numbers = Array.from({ length: 37 }, (_, i) => i); // 0-36

export default function RouletteTable({ balance, onSpin }) {
  const [bet, setBet] = useState({ number: 0, amount: 0 });
  const [spinning, setSpinning] = useState(false);
  const wheelRef = useRef();

  const placeBet = (num, amt) => {
    if (amt > balance) return alert("Not enough balance!");
    setBet({ number: num, amount: amt });
  };

  const spinWheel = () => {
    if (spinning || bet.amount <= 0) return;
    setSpinning(true);
    const winningNumber = numbers[Math.floor(Math.random() * numbers.length)];

    // Rotate wheel randomly + easing
    const spins = 5 + Math.random() * 3;
    const degree = 360 * spins + (360 / numbers.length) * winningNumber;
    wheelRef.current.style.transition = "transform 4s cubic-bezier(0.33, 1, 0.68, 1)";
    wheelRef.current.style.transform = `rotate(${degree}deg)`;

    setTimeout(() => {
      const win = bet.number === winningNumber ? bet.amount * 35 : -bet.amount;
      onSpin(winningNumber, bet.amount, win);
      setSpinning(false);
      setBet({ number: 0, amount: 0 });
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = `rotate(${(360 / numbers.length) * winningNumber}deg)`;
    }, 4000);
  };

  return (
    <div>
      <div
        ref={wheelRef}
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          border: "8px solid #fff",
          margin: "20px auto",
          background: "conic-gradient(red 0 10deg, black 10deg 20deg, red 20deg 30deg, black 30deg 40deg, #fff 40deg 50deg)",
        }}
      ></div>
      <div>
        <input
          type="number"
          min="0"
          max={balance}
          placeholder="Bet Amount"
          value={bet.amount}
          onChange={(e) => setBet({ ...bet, amount: Number(e.target.value) })}
        />
        <input
          type="number"
          min="0"
          max="36"
          placeholder="Number 0-36"
          value={bet.number}
          onChange={(e) => setBet({ ...bet, number: Number(e.target.value) })}
        />
        <button onClick={spinWheel} disabled={spinning}>
          {spinning ? "Spinning..." : "Spin"}
        </button>
      </div>
    </div>
  );
}
