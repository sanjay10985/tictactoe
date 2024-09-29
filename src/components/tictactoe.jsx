import React, { useState } from "react";

// Helper function to check if there's a winner
const checkWinner = (board) => {
  const winConditions = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6], // Diagonal 2
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return 'X' or 'O'
    }
  }

  return null; // No winner yet
};

// Main Tic-Tac-Toe component
const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // 3x3 grid
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Player starts first
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return; // Ignore if cell is already filled or game over

    const newBoard = [...board];
    newBoard[index] = isPlayerTurn ? "X" : "O"; // Player is 'X', AI will be 'O'
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setIsPlayerTurn(!isPlayerTurn); // Toggle turn
    }
  };

  const renderCell = (index) => {
    return (
      <button
        className="w-24 h-24 text-3xl font-bold flex items-center justify-center bg-gray-100 border-2 border-gray-600 cursor-pointer hover:bg-gray-300 transition-all"
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">AI Tic-Tac-Toe</h1>
      <div className="grid grid-cols-3 grid-rows-3 gap-2">
        {board.map((_, index) => renderCell(index))}
      </div>
      {winner ? (
        <h2 className="text-2xl font-bold mt-4 text-green-600">
          {winner} wins!
        </h2>
      ) : (
        <h2 className="text-2xl font-bold mt-4">
          Next turn: {isPlayerTurn ? "Player (X)" : "AI (O)"}
        </h2>
      )}
    </div>
  );
};

export default TicTacToe;
