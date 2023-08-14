import OpenModalButton from "../OpenModalButton";
import CharacterModal from "../CharacterModal";
import { useGameState, useChangeGameState } from "../../context/GameState";

export default function GameStateRest() {
  const gameState = useGameState();
  const toggleGameState = useChangeGameState();

  function handleGameStateChange() {
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
    <div id="game-state-rest-container">
      <p>You must rest...</p>
      <p>Choose one of the following rest options...</p>
      <p>Each choice has a different effect.</p>
      <div id="rest-options-container">
        {restOptions.map((option, idx) => {
          return (
            <div key={idx} className="option-item-container">
              <h5>{option.name}</h5>
              <ul>
                <li>Energy Change: {option.energyChange}</li>
                <li>Sanity Change: {option.sanityChange}</li>
                <li>TotalTurnCost: {option.totalTurnCost}</li>
              </ul>
              <button
                onClick={() => {
                  handleGameStateChange();
                }}
              ></button>
            </div>
          );
        })}
      </div>
      <OpenModalButton
        className="modal_button"
        buttonText="Inventory"
        modalComponent={<CharacterModal />}
      />
    </div>
  );
}
