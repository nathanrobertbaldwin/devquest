import React from "react";

import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import ProfileButton from "./ProfileButton";
import GameMenuModal from "../GameMenuModal";
import CharacterModal from "../CharacterModal";
import { useChangeGameState } from "../../context/GameState";
const _ = require("lodash");

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const character = useSelector((state) => state.character);
  const toggleGameState = useChangeGameState();

  return (
    <div id="navigation-component-container">
      <div id="navigation-container">
        <img
          alt="logo"
          onClick={() => toggleGameState("intro")}
          src="https://devquest.s3.us-east-2.amazonaws.com/logos/logo-small.png"
          style={{ height: "50px", cursor: "pointer"}}
        />

        {sessionUser?.admin && (
          <div id="navigation-admin-control-buttons">
            <button onClick={() => toggleGameState("intro")}>Intro</button>
            <button onClick={() => toggleGameState("combat")}>Combat</button>
            <button onClick={() => toggleGameState("rest")}>Rest</button>
            <button onClick={() => toggleGameState("boon")}>Boon</button>
            <button onClick={() => toggleGameState("win")}>Win</button>
            <button onClick={() => toggleGameState("loss")}>Loss</button>
          </div>
        )}
        <ul id="navigation-links-container">
          {!_.isEmpty(character) && sessionUser && (
            <OpenModalButton
              className="modal_button"
              buttonText="Inventory"
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
