import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getUserSavesThunk } from "../../store/saves";
import { getCharacterDataThunk } from "../../store/character";
import "./SavesModal.css";

function SavesModal() {
  const [isLoaded, setIsLoaded] = useState(false);
  const saves_data = useSelector((store) => store.saves);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  useEffect(() => {
    if (!Object.values(saves_data).length) {
      dispatch(getUserSavesThunk()).then(() => {
        setIsLoaded(true);
      });
    }
  }, dispatch);

  const handleLoadSave = async (charId) => {
    await dispatch(getCharacterDataThunk(charId)).then(() => {
      closeModal();
    });
  };

  if (!isLoaded) return <></>;

  const savesArr = Object.values(saves_data);

  return (
    <div id="saves-panel">
      <div id="saves-component-container">
        <h3>Saved Games</h3>
        {savesArr.map((save, idx) => {
          return (
            <div id="saved-game-container" key={idx}>
              <span>Save Slot {idx + 1}</span>
              <button onClick={() => handleLoadSave(save.id)}>Load Save</button>
              <div id="save-name-span-container">
                {save.name ? <span>{save.name}</span> : <span>Empty</span>}
              </div>
              <button>Delete Save</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SavesModal;
