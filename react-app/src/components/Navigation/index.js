import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import ProfileButton from "./ProfileButton";
import GameMenuModal from "../GameMenuModal";
import CharacterModal from "../CharacterModal";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const character = useSelector((state) => state.character);

  return (
    <div id="navigation-component-container">
      <div id="navigation-container">
        <NavLink exact to="/">
          Home
        </NavLink>
        <ul id="navigation-links-container">
          {character && sessionUser && (
            <OpenModalButton
              className="modal_button"
              buttonText="Character"
              modalComponent={<CharacterModal />}
            />
          )}
          {sessionUser && (
            <OpenModalButton
              className="modal_button"
              buttonText="Saves"
              modalComponent={<GameMenuModal />}
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
