import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleInventoryItemEquipThunk } from "../../store/character";
import "./CharacterModalv2.css";
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

  const maxEnergyTotal =
    char.maxEnergy +
    (equippedGear ? equippedGear.maxEnergyBoost : 0) +
    (equippedFood ? equippedFood.maxEnergyBoost : 0) +
    (equippedReference ? equippedReference.maxEnergyBoost : 0);

  return (
    <div id="char-inventory-modal-container">
      <div id="char-info-container">
        <h3 id="char-info-name">{char.name}</h3>
        <div id="char-info-attributes-container">
          <h5>Attributes</h5>
          <div className="char-attribute">
            <span>Algos:</span>
            <span>{algorithmsTotal}</span>
          </div>
          <div className="char-attribute">
            <span>Backend:</span>
            <span> {backendTotal}</span>
          </div>
          <div className="char-attribute">
            <span>Frontend:</span>
            <span>{frontendTotal}</span>
          </div>
          <div className="char-attribute">
            <span>CSS: </span>
            <span>{cssTotal}</span>
          </div>
          <div className="char-attribute">
            <span>Debugging:</span>
            <span> {debuggingTotal}</span>
          </div>
          <div className="char-attribute">
            <span>Energy:</span>
            <span> {char.currEnergy}</span>
          </div>
          <div className="char-attribute">
            <span>Max Energy:</span>
            <span> {maxEnergyTotal}</span>
          </div>
          <div className="char-attribute">
            <span>Sanity:</span>
            <span> {char.currSanity}</span>
          </div>
          <div className="char-attribute">
            <span>Max Sanity: </span>
            <span>{char.maxSanity}</span>
          </div>
        </div>
        <div id="char-info-attacks-container">
          <h5>Attacks</h5>
          {Object.entries(attacks).map(([key, value]) => {
            return (
              <div key={key} id="char-info-attack-card">
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
      <div id="char-inventory-container">
        <h5>Gear</h5>
        <div className="char-inventory-section">
          {Object.entries(inventory).map(([key, item]) => {
            if (item.slot === "gear" && !_.isEqual(equippedGear, item)) {
              return (
                <div
                  key={key}
                  className="char-inventory-unequipped-equipment-card"
                  onClick={() => {
                    dispatch(toggleInventoryItemEquipThunk(key));
                    setEquippedGear(item);
                  }}
                >
                  <img
                    className="char-inventory-item-image"
                    alt={item.name}
                    src={item.imageUrl}
                  />
                </div>
              );
            }
            return undefined;
          })}
        </div>
        <h5>Food</h5>
        <div className="char-inventory-section">
          {Object.entries(inventory).map(([key, item]) => {
            if (item.slot === "food" && !_.isEqual(equippedFood, item)) {
              return (
                <div
                  key={key}
                  className="char-inventory-unequipped-equipment-card"
                  onClick={() => {
                    dispatch(toggleInventoryItemEquipThunk(key));
                    setEquippedFood(item);
                  }}
                >
                  <img
                    className="char-inventory-item-image"
                    alt={item.name}
                    src={item.imageUrl}
                  />
                </div>
              );
            }
            return undefined;
          })}
        </div>
        <h5>Reference</h5>
        <div className="char-inventory-section">
          {Object.entries(inventory).map(([key, item]) => {
            if (
              item.slot === "reference" &&
              !_.isEqual(equippedReference, item)
            ) {
              return (
                <div
                  key={key}
                  className="char-inventory-equipment-card"
                  onClick={() => {
                    dispatch(toggleInventoryItemEquipThunk(key));
                    setEquippedReference(item);
                  }}
                >
                  <img
                    className="char-inventory-item-image"
                    alt={item.name}
                    src={item.imageUrl}
                  />
                </div>
              );
            }
            return undefined;
          })}
        </div>
      </div>
      <div id="char-inventory-equipped-items-container">
        <div className="equipped-item-container">
          <h5 className="char-inventory-equipped-gear-header">Gear</h5>
          {equippedGear && (
            <div
              className="char-inventory-equipment-card"
              onClick={() => {
                dispatch(toggleInventoryItemEquipThunk(equippedGear.id));
                setEquippedGear(null);
              }}
            >
              <img
                className="char-inventory-item-image"
                alt={equippedGear.name}
                src={equippedGear.imageUrl}
              />
            </div>
          )}
        </div>
        <div className="equipped-item-container">
          <h5 className="char-inventory-equipped-gear-header">Food</h5>
          {equippedFood && (
            <div
              className="char-inventory-equipment-card"
              onClick={() => {
                dispatch(toggleInventoryItemEquipThunk(equippedFood.id));
                setEquippedFood(null);
              }}
            >
              <img
                className="char-inventory-item-image"
                alt={equippedFood.name}
                src={equippedFood.imageUrl}
              />
            </div>
          )}
        </div>
        <div className="equipped-item-container">
          <h5 className="char-inventory-equipped-gear-header">Ref</h5>
          {equippedReference && (
            <div
              className="char-inventory-equipment-card"
              onClick={() => {
                dispatch(toggleInventoryItemEquipThunk(equippedReference.id));
                setEquippedReference(null);
              }}
            >
              <img
                className="char-inventory-item-image"
                alt={equippedReference.name}
                src={equippedReference.imageUrl}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CharacterModal;
