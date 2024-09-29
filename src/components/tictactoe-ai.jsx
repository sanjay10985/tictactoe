import React, { useState, useEffect } from "react";

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

// Check if all cells are filled
const isBoardFull = (board) => {
  return board.every((cell) => cell !== null);
};

// Minimax Algorithm
const minimax = (board, isMaximizing) => {
  const winner = checkWinner(board);

  // Base cases
  if (winner === "O") return { score: 1 }; // AI wins
  if (winner === "X") return { score: -1 }; // Player wins
  if (isBoardFull(board)) return { score: 0 }; // Draw

  const availableMoves = board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null);

  // AI's turn (Maximizing player)
  if (isMaximizing) {
    let bestMove = { score: -Infinity };
    for (let index of availableMoves) {
      const newBoard = [...board];
      newBoard[index] = "O"; // AI makes a move
      const move = minimax(newBoard, false);
      if (move.score > bestMove.score) {
        bestMove = { score: move.score, index };
      }
    }
    return bestMove;
  }

  // Player's turn (Minimizing player)
  else {
    let bestMove = { score: Infinity };
    for (let index of availableMoves) {
      const newBoard = [...board];
      newBoard[index] = "X"; // Player makes a move
      const move = minimax(newBoard, true);
      if (move.score < bestMove.score) {
        bestMove = { score: move.score, index };
      }
    }
    return bestMove;
  }
};

// Main Tic-Tac-Toe component
const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // 3x3 grid
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Player starts first
  const [winner, setWinner] = useState(null);

  // Handle player click
  const handleClick = (index) => {
    if (board[index] || winner || !isPlayerTurn) return; // Ignore if cell is already filled, game over, or not player's turn

    const newBoard = [...board];
    newBoard[index] = "X"; // Player is 'X'
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (isBoardFull(newBoard)) {
      setWinner("Draw");
    } else {
      setIsPlayerTurn(false); // It's AI's turn
    }
  };

  // AI move using Minimax
  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const bestMove = minimax(board, true); // Get the best move for AI ('O')
      const newBoard = [...board];
      newBoard[bestMove.index] = "O"; // AI makes its move
      setBoard(newBoard);

      const gameWinner = checkWinner(newBoard);
      if (gameWinner) {
        setWinner(gameWinner);
      } else if (isBoardFull(newBoard)) {
        setWinner("Draw");
      } else {
        setIsPlayerTurn(true); // Back to player's turn
      }
    }
  }, [isPlayerTurn, board, winner]);

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
          {winner === "Draw" ? "It's a Draw!" : `${winner} wins!`}
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
