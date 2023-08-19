import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import AccountFormsModal from "../AccountFormsModal";
import GameMenuModal from "../GameMenuModal";
import { useChangeGameState } from "../../context/GameState";

import "../../styles/GameStateIntro.css";

const _ = require("lodash");

export default function GameStateIntro() {
  const sessionUser = useSelector((store) => store.session.user);
  const toggleGameState = useChangeGameState();

  return (
    <div id="game-state-intro-container">
      <div id="game-state-intro-wrapper">
        <div id="logo-container">
          <img
            alt="logo"
            src="https://devquest.s3.us-east-2.amazonaws.com/logos/logo-med.png"
          />
        </div>
        <div id="welcome-button-container">
          {sessionUser ? (
            <OpenModalButton
              className="modal_button"
              buttonText="Choose Character"
              modalComponent={
                <GameMenuModal toggleGameState={toggleGameState} />
              }
            />
          ) : (
            <div id="welcome-button-container">
              <OpenModalButton
                className="modal_button"
                buttonText="Login | Signup"
                modalComponent={<AccountFormsModal />}
              />
            </div>
          )}
        </div>
        <div id="welcome-text-container">
          <h1 id="welcome-h1">Welcome to DevQuest!</h1>
          <span id="welcome-text">
            DevQuest is capstone project submission for the App Academy bootcamp
            program. In DevQuest, you create a fledgeling software engineer
            character. Over the course of the game, you will fight turn-based
            battles against monsters (programming bugs), collect equipment
            (programming necessities like Coffee), and gain permanent bonuses to
            your character like stat boosts to you "Debugging" ability. Your
            goal is to survive all encounters, including the final "Capstone
            Project" monster In order to graduate and become a Fullstack
            Engineer!
          </span>
        </div>
      </div>
    </div>
  );
}
