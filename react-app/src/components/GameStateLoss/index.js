import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCharacterDataThunk } from "../../store/character";
import "../../styles/GameStateLoss.css";

export default function GameStateLoss() {
  const dispatch = useDispatch();
  const [isEvolved, setIsEvolved] = useState(false);

  const char = useSelector((store) => store.character);

  useEffect(() => {
    setTimeout(setIsEvolved, 2000, true);
  }, []);

  useEffect(() => {
    dispatch(deleteCharacterDataThunk(char.id));
  }, []);

  return (
    <div id="game-state-loss-screen-container">
      <h4>The bugs have eaten your mind . . .</h4>
      <h4>You descend into insanity.</h4>
      {isEvolved && (
        <>
          <img
            alt="fullstack engineer"
            src="https://devquest.s3.us-east-2.amazonaws.com/splash-screens/lose.jpg"
          />
          <h4>
            Character and Save data deleted. Create a new character to play
            again.
          </h4>
        </>
      )}
    </div>
  );
}
