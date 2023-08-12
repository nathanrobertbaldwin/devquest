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

  useEffect(() => {
    if (_.isEmpty(gameData)) {
      dispatch(getGameDataThunk()).then(() => {
        setIsGameDataLoaded(true);
      });
    }
  }, [dispatch, gameData]);

  if (!isGameDataLoaded) return <></>;

  if ("GameStateIntro") {
    return (
      <div id="game-component">
        <GameStateIntro>"GameStateIntro"</GameStateIntro>
      </div>
    );
  }

  if ("GameStateCombat") {
    return (
      <div id="game-component">
        <GameStateCombat>"GameStateCombat"</GameStateCombat>
      </div>
    );
  }

  if ("GameStateEvent") {
    return (
      <div id="game-component">
        <GameStateEvent>"GameStateEvent"</GameStateEvent>
      </div>
    );
  }

  if ("GameStateLoss") {
    return (
      <div id="game-component">
        <GameStateLoss>"GameStateLoss"</GameStateLoss>
      </div>
    );
  }

  if ("GameStateWin") {
    return (
      <div id="game-component">
        <GameStateWin>"GameStateWin"</GameStateWin>
      </div>
    );
  }
}
