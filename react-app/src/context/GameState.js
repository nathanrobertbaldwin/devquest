import React, { useContext, useState } from "react";

const GameStateContext = React.createContext();
const ChangeGameStateContext = React.createContext();

export function useGameState() {
  return useContext(GameStateContext);
}

export function useChangeGameState() {
  return useContext(ChangeGameStateContext);
}

export default function GameStateProvider({ children }) {
  const [gameState, setGameState] = useState("intro");

  function toggleGameState(string) {
    setGameState(string);
  }

  return (
    <GameStateContext.Provider value={gameState}>
      <ChangeGameStateContext.Provider value={toggleGameState}>
        {children}
      </ChangeGameStateContext.Provider>
    </GameStateContext.Provider>
  );
}
