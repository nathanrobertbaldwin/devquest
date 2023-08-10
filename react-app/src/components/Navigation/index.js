import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import ProfileButton from "./ProfileButton";
import SavesModal from "../SavesModal";
import CharacterModal from "../CharacterModal";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const saveData = useSelector((state) => state.saves);

  return (
    <div id="navigation-component-container">
      <div id="navigation-container">
        <NavLink exact to="/">
          Home
        </NavLink>
        <ul id="navigation-links-container">
          {saveData && sessionUser && (
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
              modalComponent={<SavesModal />}
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
