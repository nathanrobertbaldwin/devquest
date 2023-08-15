import { useChangeGameState } from "../../context/GameState";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import CharacterBonusModal from "./CharacterBonusModal";
import {
  addInventoryItemThunk,
  toggleInventoryItemEquipThunk,
  udpateCharacterSanityThunk,
  updateCharacterEnergyThunk,
} from "../../store/character";

import "./GameStateBoon.css";
import { useState } from "react";

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
    await dispatch(addInventoryItemThunk(char.id, item.id)).then(() => {
      dispatch(toggleInventoryItemEquipThunk(item.id));
    });
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
    setTimeout(toggleGameState, 1000, "combat");
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
      <div id="boon-item-container">
        <h5>{boon.text}</h5>
        <span>You found a new {equipmentArr[boon.num].slot} item!</span>
        <span>{equipmentArr[boon.num].name}</span>
        <div id="boon-item-image-container">
          <img alt="new item" src={`${equipmentArr[boon.num].imgUrl}`} />
        </div>
        <button
          onClick={() => handleAddItemToInventory(equipmentArr[boon.num])}
        >
          Add Item to Inventory
        </button>
      </div>
    );
  } else if (boon.type === "stats") {
    boonMapper = (
      <div id="boon-stats-container">
        <h5>{boon.text}</h5>
        <span>You may allocate {boon.num} points to your stats!</span>
        <OpenModalButton
          className="modal_button"
          buttonText="Character"
          modalComponent={<CharacterBonusModal stats={boon.num} />}
        />
      </div>
    );
  } else if (boon.type === "heal")
    boonMapper = (
      <div id="boon-heal-container">
        <h5>{boon.text}</h5>
        <span>You recover {boon.num} points of energy and sanity!</span>
        <button onClick={() => handleReturnToCombat(boon.num)}>
          Return To Combat!
        </button>
      </div>
    );

  if (boonApplied) return <>...Loading</>;

  return <div id="game-state-boon-container">{boonMapper}</div>;
}
