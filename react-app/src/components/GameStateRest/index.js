import OpenModalButton from "../OpenModalButton";
import CharacterModal from "../CharacterModal";
import {
  updateCharacterEnergyThunk,
  udpateCharacterSanityThunk,
} from "../../store/character";
import { useChangeGameState } from "../../context/GameState";
import { useDispatch, useSelector } from "react-redux";
import "./GameStateRest.css";

export default function GameStateRest() {
  const dispatch = useDispatch();
  const toggleGameState = useChangeGameState();

  const char = useSelector((store) => {
    return store.character;
  });

  const currEnergy = useSelector((store) => {
    return store.character.currEnergy;
  });

  const currSanity = useSelector((store) => {
    return store.character.currSanity;
  });

  async function handleRestOption(charId, option) {
    await dispatch(
      updateCharacterEnergyThunk(charId, option.energyChange * -1)
    );
    await dispatch(
      udpateCharacterSanityThunk(charId, option.sanityChange * -1)
    );
    setTimeout(toggleGameState, 1000, "combat");
  }

  const restOptions = [
    {
      name: "Take A Break",
      energyChange: 20,
      sanityChange: 10,
      totalTurnCost: 4,
    },
    {
      name: "Drink Coffee",
      energyChange: 20,
      sanityChange: -5,
      totalTurnCost: 1,
    },
    { name: "Nap", energyChange: 30, sanityChange: -30, totalTurnCost: 16 },
    { name: "Eat Food", energyChange: 20, sanityChange: 10, totalTurnCost: 8 },
    {
      name: "Sleep The Night",
      energyChange: 80,
      sanityChange: -20,
      totalTurnCost: 20,
    },
  ];

  return (
    <div id="game-state-">
      <div id="character-resources-container">
        <div id="character-image-container">
          <img alt="character" src="" />
        </div>
        <span className="character-resources-span">
          Energy: {currEnergy}/{char.maxEnergy}
        </span>
        <span className="character-resources-span">
          Sanity: {currSanity}/{char.maxSanity}
        </span>
      </div>
      <div id="game-state-rest-container">
        <p>You must rest...</p>
        <p>Choose one of the following rest options...</p>
        <p>Each choice has a different effect.</p>
        <div id="rest-options-container">
          {restOptions.map((option, idx) => {
            return (
              <div
                key={idx}
                onClick={() => handleRestOption(char.id, option)}
                className="option-item-container"
              >
                <h5>{option.name}</h5>
                <ul>
                  <li>Energy Change: {option.energyChange}</li>
                  <li>Sanity Change: {option.sanityChange}</li>
                  <li>TotalTurnCost: {option.totalTurnCost}</li>
                </ul>
              </div>
            );
          })}
        </div>
        <div id="inventory-button-container">
          <OpenModalButton
            className="modal_button"
            buttonText="Inventory"
            modalComponent={<CharacterModal />}
          />
        </div>
      </div>
    </div>
  );
}
