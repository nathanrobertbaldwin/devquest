import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import ProfileButton from "./ProfileButton";
import GameMenuModal from "../GameMenuModal";
import CharacterModal from "../CharacterModal";
import { useGameState, useChangeGameState } from "../../context/GameState";
const _ = require("lodash");

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const character = useSelector((state) => state.character);
  const gameState = useGameState();
  const toggleGameState = useChangeGameState();

  return (
    <div id="navigation-component-container">
      <div id="navigation-container">
        <NavLink exact to="/">
          Home
        </NavLink>
        <button onClick={() => toggleGameState("intro")}>Intro</button>
        <button onClick={() => toggleGameState("combat")}>Combat</button>
        <button onClick={() => toggleGameState("rest")}>Rest</button>
        <button onClick={() => toggleGameState("boon")}>Boon</button>
        <button onClick={() => toggleGameState("win")}>Win</button>
        <button onClick={() => toggleGameState("loss")}>Loss</button>
        <ul id="navigation-links-container">
          {!_.isEmpty(character) && sessionUser && (
            <OpenModalButton
              className="modal_button"
              buttonText="Character"
              modalComponent={<CharacterModal />}
            />
          )}
          {sessionUser && (
            <OpenModalButton
              className="modal_button"
              buttonText="Saves Menu"
              modalComponent={
                <GameMenuModal toggleGameState={toggleGameState} />
              }
            />
          )}
          {isLoaded && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
