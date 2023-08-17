import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getUserSavesThunk } from "../../store/saves";
import {
  deleteCharacterDataThunk,
  getCharacterDataThunk,
} from "../../store/character";
import OpenModalButton from "../OpenModalButton";
import CharacterCreationModal from "../CharacterCreationModal";
import "./GameMenu.css";

function GameMenuModal() {
  const [isLoaded, setIsLoaded] = useState(false);
  const savesData = useSelector((store) => store.saves);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  useEffect(() => {
    dispatch(getUserSavesThunk()).then(() => {
      setIsLoaded(true);
    });

    setIsLoaded(true);
  }, [dispatch]);

  const handleLoadSave = async (charId) => {
    await dispatch(getCharacterDataThunk(charId)).then(() => {
      closeModal();
    });
  };

  const handleDeleteSave = async (charId) => {
    await dispatch(deleteCharacterDataThunk(charId));
  };

  if (!isLoaded) return <></>;

  const savesArr = Object.values(savesData);

  return (
    <div id="game-menu-container">
      <div id="game-menu-panel">
        <h5 id="game-menu-header">Load A Save File or Create a New Game</h5>
        {savesArr.map((save, idx) => {
          return (
            <div id="saved-game-container" key={idx}>
              <span>Slot {idx + 1}</span>
              {save.name ? (
                <>
                  <button onClick={() => handleLoadSave(save.id)}>
                    Load Save
                  </button>
                  <div id="save-name-span-container">
                    {save.name ? <span>{save.name}</span> : <span>Empty</span>}
                  </div>
                  <button onClick={() => handleDeleteSave(save.id)}>
                    Delete Save
                  </button>
                </>
              ) : (
                <OpenModalButton
                  className="modal_button"
                  buttonText="Character"
                  modalComponent={<CharacterCreationModal />}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GameMenuModal;
