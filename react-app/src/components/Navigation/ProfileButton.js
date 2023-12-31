import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { useChangeGameState } from "../../context/GameState";
import OpenModalButton from "../OpenModalButton";
import AccountFormsModal from "../AccountFormsModal";
import CreateNewEquipmentModal from "../EquipmentCreationModal";
import CreateNewMonsterModal from "../MonsterCreationModal";

import "../../styles/ProfileButton.css";

const _ = require("lodash");

function ProfileButton({ user }) {
  const dispatch = useDispatch();

  const char = useSelector((store) => store.character);

  const toggleGameState = useChangeGameState();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  async function handleLogout(e) {
    e.preventDefault();
    toggleGameState("intro");
    dispatch(logout());
  }

  async function handleGSChange(string) {
    toggleGameState(string);
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
            {!_.isEmpty(char) && (
              <li>
                <button onClick={() => handleGSChange("combat")}>
                  To Combat
                </button>
              </li>
            )}
            {user.admin && (
              <div>
                <li>
                  <OpenModalButton
                    buttonText="Create Equipment"
                    onItemClick={closeMenu}
                    modalComponent={<CreateNewEquipmentModal />}
                  />
                </li>
                <li>
                  <button onClick={() => handleGSChange("allequipment")}>
                    Manage Equipment
                  </button>
                </li>
                <li>
                  <OpenModalButton
                    buttonText="Create Monster"
                    onItemClick={closeMenu}
                    modalComponent={<CreateNewMonsterModal />}
                  />
                </li>
                <li>
                  <button onClick={() => handleGSChange("allmonsters")}>
                    Manage Monsters
                  </button>
                </li>
              </div>
            )}
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Login | Signup"
              onItemClick={closeMenu}
              modalComponent={<AccountFormsModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
