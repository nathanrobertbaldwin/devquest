import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleInventoryItemEquipThunk } from "../../store/character";
import "./CharacterModal.css";
const _ = require("lodash");

function CharacterModal() {
  const dispatch = useDispatch();
  const char = useSelector((store) => store.character);
  const inventory = useSelector((store) => store.character.inventory);
  const attacks = useSelector((store) => store.character.attacks);

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

  const energyTotal =
    char.maxEnergy +
    (equippedGear ? equippedGear.energyBoost : 0) +
    (equippedFood ? equippedFood.energyBoost : 0) +
    (equippedReference ? equippedReference.energyBoost : 0);

  return (
    <div id="container">
      <h3 id="header">{char.name}</h3>
      <div id="avatar">
        <div id="avatar-image-container"></div>
        <div id="attributes-container">
          <h5>Attributes</h5>
          <span className="attribute">Algos: {algorithmsTotal}</span>
          <span className="attribute">Backend: {backendTotal}</span>
          <span className="attribute">Frontend: {frontendTotal}</span>
          <span className="attribute">CSS: {cssTotal}</span>
          <span className="attribute">Debugging: {debuggingTotal}</span>
          <span className="attribute">Energy: {energyTotal}</span>
          <span className="attribute">Max Energy: {energyTotal}</span>
          <span className="attribute">Sanity: {char.currSanity}</span>
          <span className="attribute">Max Sanity: {char.maxSanity}</span>
        </div>
      </div>
      <div id="equipped-items">
        <div id="equipped-gear-container">
          {equippedGear ? (
            <div
              id="equipped-gear"
              onClick={() => {
                dispatch(toggleInventoryItemEquipThunk(equippedGear.id));
                setEquippedGear(null);
              }}
            >
              <img alt="" src={equippedGear.imageUrl} />
            </div>
          ) : (
            <span>Gear</span>
          )}
        </div>
        <div id="equipped-food-container">
          {equippedFood ? (
            <div
              id="equipped-food"
              onClick={() => {
                dispatch(toggleInventoryItemEquipThunk(equippedFood.id));
                setEquippedFood(null);
              }}
            >
              <img alt="" src={equippedFood.imageUrl} />
            </div>
          ) : (
            <span>Food</span>
          )}
        </div>
        <div id="equipped-reference-container">
          {equippedReference ? (
            <div
              id="equipped-reference"
              onClick={() => {
                dispatch(toggleInventoryItemEquipThunk(equippedReference.id));
                setEquippedReference(null);
              }}
            >
              <img alt="" src={equippedReference.imageUrl} />
            </div>
          ) : (
            <span>Reference</span>
          )}
        </div>
      </div>
      <div id="attacks">
        {Object.entries(attacks).map(([key, value]) => {
          return (
            <div key={key} className="item-card">
              <span>Name: {value["name"]}</span>
              <span>Power: {value["power"]}</span>
              <span>Energy Cost: {value["energyCost"]}</span>
              <span>Primary Stat: {value["primaryStat"]}</span>
            </div>
          );
        })}
      </div>
      <div id="inventory">
        <h5>Gear</h5>
        <div id="inventory-gear">
          {Object.entries(inventory).map(([key, item]) => {
            if (item.slot === "gear" && !_.isEqual(equippedGear, item)) {
              return (
                <div
                  key={key}
                  className="equipment-card"
                  onClick={() => {
                    dispatch(toggleInventoryItemEquipThunk(key));
                    setEquippedGear(item);
                  }}
                >
                  <span>Name: {item.name}</span>
                </div>
              );
            }
            return undefined;
          })}
        </div>
        <h5>Food</h5>
        <div id="inventory-food">
          {Object.entries(inventory).map(([key, item]) => {
            if (item.slot === "food" && !_.isEqual(equippedFood, item)) {
              return (
                <div
                  key={key}
                  className="equipment-card"
                  onClick={() => {
                    dispatch(toggleInventoryItemEquipThunk(key));
                    setEquippedFood(item);
                  }}
                >
                  <span>Name: {item.name}</span>
                </div>
              );
            }
            return undefined;
          })}
        </div>
        <h5>Reference</h5>
        <div id="inventory-reference">
          {Object.entries(inventory).map(([key, item]) => {
            if (
              item.slot === "reference" &&
              !_.isEqual(equippedReference, item)
            ) {
              return (
                <div
                  key={key}
                  className="equipment-card"
                  onClick={() => {
                    dispatch(toggleInventoryItemEquipThunk(key));
                    setEquippedReference(item);
                  }}
                >
                  <span>Name: {item.name}</span>
                </div>
              );
            }
            return undefined;
          })}
        </div>
      </div>
    </div>
  );
}

export default CharacterModal;
