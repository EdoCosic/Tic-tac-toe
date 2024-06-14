import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [cells, setCells] = useState(Array(9).fill(null));
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [gameWin, setGameWin] = useState(false);
  const [gameDraw, setGameDraw] = useState(false);

  function handleClick(id) {
    if (cells[id] === null && !gameWin && !gameDraw) {
      const newCells = cells.slice();
      newCells[id] = currentPlayer;
      setCells(newCells);
      const winner = checkWin(newCells);
      if (!winner && drawGame(newCells)) setGameDraw(true);
      if (winner) {
        if (winner === "X") setXScore(xScore + 1);
        else setOScore(oScore + 1);
      } 
      else if (!winner && !gameDraw) setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  }

  function checkWin(cells) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        setGameWin(true);
        return cells[a];
      }
    }
    return null;
  }

  function drawGame(cells) {
    for (let i = 0; i < 9; i++) {
      if (cells[i] === null) {
        return false;
      }
    }
    return true;
  }

  function handleNewGame() {
    setGameWin(false);
    setGameDraw(false);
    setCells(Array(9).fill(null));
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    setXScore(0);
    setOScore(0);
  }

  function handleContinueGame() {
    setGameWin(false);
    setGameDraw(false);
    setCells(Array(9).fill(null));
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  return (
    <>
      <div className="title">
        <h1>Player X: {xScore}</h1>
        <h1>Player O: {oScore}</h1>
      </div>
      <div className="board">
        <div className="row">
          <div className="cell" onClick={() => handleClick(0)}>{cells[0]}</div>
          <div className="cell" onClick={() => handleClick(1)}>{cells[1]}</div>
          <div className="cell" onClick={() => handleClick(2)}>{cells[2]}</div>
        </div>
        <div className="row">
          <div className="cell" onClick={() => handleClick(3)}>{cells[3]}</div>
          <div className="cell" onClick={() => handleClick(4)}>{cells[4]}</div>
          <div className="cell" onClick={() => handleClick(5)}>{cells[5]}</div>
        </div>
        <div className="row">
          <div className="cell" onClick={() => handleClick(6)}>{cells[6]}</div>
          <div className="cell" onClick={() => handleClick(7)}>{cells[7]}</div>
          <div className="cell" onClick={() => handleClick(8)}>{cells[8]}</div>
        </div>
      </div>
      <h2 className="center">On the move: {currentPlayer}</h2>
      <button onClick={() => setCells(Array(9).fill(null))} className="button align">RESET GAME</button>
      {(gameWin || gameDraw) && <div className="disable-content"></div>}
      {(gameWin || gameDraw) && <div className="alert">
        {gameWin && <h2 className="center">Player {currentPlayer === "X" ? "X" : "O"} has won the game</h2>}
        {gameDraw && <h2 className="center">The game ended in a draw</h2>}
        <div className="buttons">
          <button className="button" onClick={handleNewGame}>New game</button>
          <button className="button" onClick={handleContinueGame}>Continue game</button>
        </div>
      </div>}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
