import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCharacterDataThunk } from "../../store/character";

import "../../styles/GameStateWin.css";

export default function GameStateWin() {
  const dispatch = useDispatch();
  const char = useSelector((store) => store.character);
  const [isEvolved, setIsEvolved] = useState(false);

  useEffect(() => {
    setTimeout(setIsEvolved, 2000, true);
  }, []);

  useEffect(() => {
    dispatch(deleteCharacterDataThunk(char.id));
  }, []);

  return (
    <div id="game-state-win-screen-container">
      <h4>You have defeated the Capstone Project!</h4>
      <h4>What? You are evolving . . . </h4>
      {isEvolved && (
        <>
          <img
            alt="fullstack engineer"
            src="https://devquest.s3.us-east-2.amazonaws.com/splash-screens/win.jpg"
          />
          <h4>You evolve into a Fullstack Engineer!</h4>
        </>
      )}
    </div>
  );
}
