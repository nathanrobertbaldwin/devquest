import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGameDataThunk } from "../../store/gamedata";
import GameStateIntro from "../GameStateIntro";
import GameStateCombat from "../GameStateCombat";
import GameStateEvent from "../GameStateEvent";
import GameStateLoss from "../GameStateLoss";
import GameStateWin from "../GameStateWin";

import "./Home.css";
const _ = require("lodash");

export default function Home() {
  const gameData = useSelector((store) => store.gamedata);
  const dispatch = useDispatch();
  const [isGameDataLoaded, setIsGameDataLoaded] = useState(false);
  const [gameState, setGameState] = useState("intro");

  useEffect(() => {
    if (_.isEmpty(gameData)) {
      dispatch(getGameDataThunk()).then(() => {
        setIsGameDataLoaded(true);
      });
    }
  }, [dispatch, gameData]);

  function changeGameState(state) {
    setGameState(state);
  }

  if (!isGameDataLoaded) return <></>;

  if (gameState === "intro") {
    return (
      <div id="game-component">
        <button onClick={() => changeGameState("combat")}>Combat</button>
        <GameStateIntro />
      </div>
    );
  }

  if (gameState === "combat") {
    return (
      <div id="game-component">
        <button onClick={() => changeGameState("intro")}>Intro</button>
        <GameStateCombat />
      </div>
    );
  }

  if (gameState === "event") {
    return (
      <div id="game-component">
        <GameStateEvent />
      </div>
    );
  }

  if (gameState === "loss") {
    return (
      <div id="game-component">
        <GameStateLoss />
      </div>
    );
  }

  if (gameState === "win") {
    return (
      <div id="game-component">
        <GameStateWin />
      </div>
    );
  }
}
