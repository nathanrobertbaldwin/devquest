import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGameDataThunk } from "../../store/gamedata";
import GameStateIntro from "../GameStateIntro";
import GameStateCombat from "../GameStateCombat";
import GameStateRest from "../GameStateRest";
import GameStateBoon from "../GameStateBoon";
import GameStateLoss from "../GameStateLoss";
import GameStateWin from "../GameStateWin";
import GameStateAllEquipment from "../GameStateAllEquipment";
import GameStateAllMonsters from "../GameStateAllMonsters";

import { useGameState } from "../../context/GameState";
import { getCharacterDataThunk } from "../../store/character";

import "./Home.css";
const _ = require("lodash");

export default function Home() {
  const dispatch = useDispatch();

  const gameState = useGameState();
  const gameData = useSelector((store) => store.gamedata);
  const [isGameDataLoaded, setIsGameDataLoaded] = useState(false);

  useEffect(() => {
    async function wrapper() {
      if (_.isEmpty(gameData)) {
        await dispatch(getGameDataThunk()).then(() => {
          setIsGameDataLoaded(true);
        });
      }
    }
    wrapper();
  }, [dispatch, gameData]);

  if (!isGameDataLoaded) return <></>;

  if (gameState === "intro") {
    return (
      <div id="game-component">
        <GameStateIntro />
      </div>
    );
  }

  if (gameState === "combat") {
    return (
      <div id="game-component">
        <GameStateCombat />
      </div>
    );
  }

  if (gameState === "rest") {
    return (
      <div id="game-component">
        <GameStateRest />
      </div>
    );
  }

  if (gameState === "boon") {
    return (
      <div id="game-component">
        <GameStateBoon />
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

  if (gameState === "allequipment") {
    return (
      <div id="game-component">
        <GameStateAllEquipment />
      </div>
    );
  }

  if (gameState === "allmonsters") {
    return (
      <div id="game-component">
        <GameStateAllMonsters />
      </div>
    );
  }
}
