import { createContext } from "react";

export const GameState = createContext();

const GameStateProvider = ({ children }) => {
  const  gameState = "intro";

  return <GameState.Provider value={gameState}>{children}</GameState.Provider>;
};

export default GameStateProvider;
