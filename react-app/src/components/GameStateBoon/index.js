import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import CharacterBonusModal from "../CharacterBonusModal";
import { useChangeGameState } from "../../context/GameState";
import {
  addInventoryItemThunk,
  udpateCharacterSanityThunk,
  updateCharacterEnergyThunk,
} from "../../store/character";
import { useState } from "react";
import "./GameStateBoon.css";

export default function GameStateBoon() {
  const dispatch = useDispatch();
  const toggleGameState = useChangeGameState();

  const char = useSelector((store) => {
    return store.character;
  });

  const equipmentArr = useSelector((store) => {
    return store.gamedata.equipmentArr;
  });

  const [boonApplied, setBoonApplied] = useState(false);

  async function handleAddItemToInventory(item) {
    await dispatch(addInventoryItemThunk(char.id, item.id));
    setBoonApplied(true);
    setTimeout(toggleGameState, 1000, "combat");
  }

  async function handleReturnToCombat(change) {
    await dispatch(updateCharacterEnergyThunk(char.id, change * -1)).then(
      () => {
        dispatch(udpateCharacterSanityThunk(char.id, change * -1));
      }
    );
    setBoonApplied(true);
    // setTimeout(toggleGameState, 1000, "combat");
  }

  const boonOptions = [
    {
      type: "item",
      text: "You find a new item!",
      num: Math.floor(Math.random() * equipmentArr.length),
    },
    {
      type: "stats",
      text: "You gained experience!",
      num: Math.ceil(Math.random() * 3),
    },
    {
      type: "heal",
      text: "Your boss gives you the afternoon off!",
      num: Math.ceil(Math.random() * 20),
    },
  ];

  const boon = boonOptions[Math.floor(Math.random() * 3)];

  let boonMapper = undefined;

  if (boon.type === "item") {
    boonMapper = (
      <div className="gsr-boon-container">
        <h4>{boon.text}</h4>
        <span>{equipmentArr[boon.num].name}</span>
        <img alt="new item" src={`${equipmentArr[boon.num].imageUrl}`} />
        <button
          onClick={() => handleAddItemToInventory(equipmentArr[boon.num])}
        >
          Add Item to Inventory
        </button>
      </div>
    );
  } else if (boon.type === "stats") {
    boonMapper = (
      <div className="gsr-boon-container">
        <h4>{boon.text}</h4>
        <span>You may allocate {boon.num} points to your stats!</span>
        <OpenModalButton
          className="modal_button"
          buttonText="Character"
          modalComponent={
            <CharacterBonusModal
              stats={boon.num}
              setBoonApplied={setBoonApplied}
              toggleGameState={toggleGameState}
            />
          }
        />
      </div>
    );
  } else if (boon.type === "heal")
    boonMapper = (
      <div className="gsr-boon-container">
        <h4>{boon.text}</h4>
        <span>You recover {boon.num} points of energy and sanity.</span>
        <button onClick={() => handleReturnToCombat(boon.num)}>
          Return To Combat!
        </button>
      </div>
    );

  if (boonApplied)
    return (
      <div id="gsr-loading">
        <h3>...Loading</h3>
      </div>
    );

  return (
    <div id="game-state-boon-container">
      <div id="gsb-image-container"></div>
      <div id="gsb-boon-mapper-container">{boonMapper}</div>
    </div>
  );
}
