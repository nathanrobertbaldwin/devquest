import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleInventoryItemEquipThunk } from "../../store/character";
import { useModal } from "../../context/Modal";

import "../../styles/CharacterModalv2.css";

const _ = require("lodash");

function CharacterModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const char = useSelector((store) => store.character);
  const inventory = useSelector((store) => store.character.inventory);
  const attacks = useSelector((store) => store.character.attacks);

  function handlePanelClose() {
    closeModal();
  }

  const [equippedGear, setEquippedGear] = useState(() =>
    Object.values(inventory).find(
      (item) => item.equipped === true && item.slot === "gear"
    )
  );

  const [equippedFood, setEquippedFood] = useState(
    Object.values(inventory).find(
      (item) => item.equipped === true && item.slot === "food"
    )
  );

  const [equippedReference, setEquippedReference] = useState(
    Object.values(inventory).find(
      (item) => item.equipped === true && item.slot === "reference"
    )
  );

  const algorithmsTotal =
    char.algorithms +
    (equippedGear ? equippedGear.algorithmsBoost : 0) +
    (equippedFood ? equippedFood.algorithmsBoost : 0) +
    (equippedReference ? equippedReference.algorithmsBoost : 0);

  const backendTotal =
    char.backend +
    (equippedGear ? equippedGear.backendBoost : 0) +
    (equippedFood ? equippedFood.backendBoost : 0) +
    (equippedReference ? equippedReference.backendBoost : 0);

  const frontendTotal =
    char.frontend +
    (equippedGear ? equippedGear.frontendBoost : 0) +
    (equippedFood ? equippedFood.frontendBoost : 0) +
    (equippedReference ? equippedReference.frontendBoost : 0);

  const cssTotal =
    char.css +
    (equippedGear ? equippedGear.cssBoost : 0) +
    (equippedFood ? equippedFood.cssBoost : 0) +
    (equippedReference ? equippedReference.cssBoost : 0);

  const debuggingTotal =
    char.debugging +
    (equippedGear ? equippedGear.debuggingBoost : 0) +
    (equippedFood ? equippedFood.debuggingBoost : 0) +
    (equippedReference ? equippedReference.debuggingBoost : 0);

  const maxEnergyTotal =
    char.maxEnergy +
    (equippedGear ? equippedGear.maxEnergyBoost : 0) +
    (equippedFood ? equippedFood.maxEnergyBoost : 0) +
    (equippedReference ? equippedReference.maxEnergyBoost : 0);

  function unEquippedItemElement(item) {
    return (
      <div
        key={item.id}
        className="item-card"
        onMouseOver={() => handleShowStats(item.id)}
        onMouseLeave={() => handleHideStats(item.id)}
        onClick={() => {
          dispatch(toggleInventoryItemEquipThunk(item.id));
          if (item.slot === "gear") setEquippedGear(item);
          if (item.slot === "food") setEquippedFood(item);
          if (item.slot === "reference") setEquippedReference(item);
        }}
      >
        <img className="item-image" alt={item.name} src={item.imageUrl} />
        <div id={`equipment-${item.id}`} className="item-stats hidden">
          <span className="global-bold">Click to Equip</span>
          <span className="global-bold">Name: {item.name}</span>
          <span>Algos Boost: {item.algorithmsBoost}</span>
          <span>Backend Boost: {item.backendBoost}</span>
          <span>Frontend Boost: {item.frontendBoost}</span>
          <span>CSS Boost: {item.cssBoost}</span>
          <span>Debugging Boost: {item.debuggingBoost}</span>
          <span>Max Energy Boost: {item.maxEnergyBoost}</span>
        </div>
      </div>
    );
  }

  function equippedItemElement(item) {
    return (
      <div
        className="item-card"
        onMouseOver={() => handleShowStats(item.id)}
        onMouseLeave={() => handleHideStats(item.id)}
        onClick={() => {
          dispatch(toggleInventoryItemEquipThunk(item.id));
          if (item.slot === "gear") setEquippedGear(null);
          if (item.slot === "food") setEquippedFood(null);
          if (item.slot === "reference") setEquippedReference(null);
        }}
      >
        <img className="item-image" alt={item.name} src={item.imageUrl} />
        <div id={`equipment-${item.id}`} className="item-stats hidden">
          <span className="global-bold">Click to Equip</span>
          <span className="global-bold">Name: {item.name}</span>
          <span>Algos Boost: {item.algorithmsBoost}</span>
          <span>Backend Boost: {item.backendBoost}</span>
          <span>Frontend Boost: {item.frontendBoost}</span>
          <span>CSS Boost: {item.cssBoost}</span>
          <span>Debugging Boost: {item.debuggingBoost}</span>
          <span>Max Energy Boost: {item.maxEnergyBoost}</span>
        </div>
      </div>
    );
  }

  function handleShowStats(key) {
    const item = document.getElementById(`equipment-${key}`);
    item.style.display = "flex";
  }

  function handleHideStats(key) {
    const item = document.getElementById(`equipment-${key}`);
    item.style.display = "none";
  }

  return (
    <div id="char-panel-modal-container">
      <div id="panel-close">
        <button onClick={() => handlePanelClose()}>X</button>
      </div>
      <div id="panel-info-container">
        <h3 id="info-name">{char.name}</h3>
        <div id="info-attributes-container">
          <h5>Attributes</h5>
          <div className="info-attribute">
            <span>Algos:</span>
            <span>{algorithmsTotal}</span>
          </div>
          <div className="info-attribute">
            <span>Backend:</span>
            <span> {backendTotal}</span>
          </div>
          <div className="info-attribute">
            <span>Frontend:</span>
            <span>{frontendTotal}</span>
          </div>
          <div className="info-attribute">
            <span>CSS: </span>
            <span>{cssTotal}</span>
          </div>
          <div className="info-attribute">
            <span>Debugging:</span>
            <span>{debuggingTotal}</span>
          </div>
          <div className="info-attribute">
            <span>Energy:</span>
            <span>{char.currEnergy}</span>
          </div>
          <div className="info-attribute">
            <span>Max Energy:</span>
            <span>{maxEnergyTotal}</span>
          </div>
          <div className="info-attribute">
            <span>Sanity:</span>
            <span>{char.currSanity}</span>
          </div>
          <div className="info-attribute">
            <span>Max Sanity: </span>
            <span>{char.maxSanity}</span>
          </div>
        </div>
        <div id="info-attacks-container">
          <h5>Attacks</h5>
          {Object.entries(attacks).map(([key, value]) => {
            return (
              <div key={key} className="attack-card">
                <span style={{ fontWeight: "bold" }}>
                  Name: {value["name"]}
                </span>
                <span>
                  Power: {value["power"]} | Energy Cost: {value["energyCost"]}
                </span>
                <span>Primary Stat: {value["primaryStat"]}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div id="inventory-container">
        <h5>Gear</h5>
        <div className="inventory-section">
          {Object.values(inventory).map((item) => {
            if (item.slot === "gear" && !_.isEqual(equippedGear, item)) {
              return unEquippedItemElement(item);
            } else return undefined;
          })}
        </div>
        <h5>Food</h5>
        <div className="inventory-section">
          {Object.values(inventory).map((item) => {
            if (item.slot === "food" && !_.isEqual(equippedFood, item)) {
              return unEquippedItemElement(item);
            } else return undefined;
          })}
        </div>
        <h5>Reference</h5>
        <div className="inventory-section">
          {Object.values(inventory).map((item) => {
            if (
              item.slot === "reference" &&
              !_.isEqual(equippedReference, item)
            ) {
              return unEquippedItemElement(item);
            } else return undefined;
          })}
        </div>
      </div>
      <div id="char-inventory-equipped-items-container">
        <div className="equipped-item-container">
          <h5 className="char-inventory-equipped-gear-header">Gear</h5>
          {equippedGear && equippedItemElement(equippedGear)}
        </div>
        <div className="equipped-item-container">
          <h5 className="char-inventory-equipped-gear-header">Food</h5>
          {equippedFood && equippedItemElement(equippedFood)}
        </div>
        <div className="equipped-item-container">
          <h5 className="char-inventory-equipped-gear-header">Ref</h5>
          {equippedReference && equippedItemElement(equippedReference)}
        </div>
      </div>
    </div>
  );
}

export default CharacterModal;
