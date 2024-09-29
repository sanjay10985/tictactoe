import React, { useState } from "react";
import { useParams } from "react-router-dom";

const checkWinner = (board) => {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(false);
  // const { text } = useRoutes();
  const { text } = useParams();
  console.log(text);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isPlayerTurn ? "X" : "O";
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);

    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setIsPlayerTurn(!isPlayerTurn);
    }
  };

  const renderCell = (index) => {
    return (
      <button
        className="w-24 h-24 text-3xl font-bold flex items-center justify-center bg-zinc-100 border-2 border-zinc-600 cursor-pointer hover:bg-zinc-300 transition-all"
        onClick={() => handleClick(index)}
        key={index}
      >
        {board[index]}
      </button>
    );
  };

  const isBoardFull = (board) => {
    return board.every((cell) => cell !== null);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-zinc-100 flex-col gap-8">
      <h1 className="text-4xl font-bold capitalize ">TicTacToe - {text}</h1>
      <div className="grid grid-cols-3 gap-2">
        {board.map((_, index) => renderCell(index))}
      </div>
      {winner ? (
        <h2 className="text-2xl font-bold mt-4 text-green-600">
          {winner} wins!
        </h2>
      ) : !winner && isBoardFull(board) ? (
        <h2 className="text-2xl font-bold mt-4 text-zinc-600">Draw</h2>
      ) : (
        <h2 className="text-2xl font-bold mt-4">
          Next turn: {isPlayerTurn ? "Player (X)" : "AI (O)"}
        </h2>
      )}
    </div>
  );
};

export default TicTacToe;
