import React from "react";
import TicTacToe from "./components/tictactoe-multiplayer";
import TicTacToeAI from "./components/tictactoe-ai";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<TicTacToeAI />} />
        <Route path="/:text" element={<TicTacToe />} />
      </Routes>
    </>
  );
};

export default App;
