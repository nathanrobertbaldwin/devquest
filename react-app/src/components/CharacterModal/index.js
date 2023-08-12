import { useState } from "react";
import { useSelector } from "react-redux";
import "./CharacterModal.css";
const _ = require("lodash");

function CharacterModal() {
  const character = useSelector((store) => store.character);
  const inventory = useSelector((store) => store.character.inventory);
  const attacks = useSelector((store) => store.character.attacks);

  const [equippedGear, setEquippedGear] = useState(() =>
    character.inventory.find(
      (item) => item.equipped === true && item.slot === "gear"
    )
  );
  const [equippedFood, setEquippedFood] = useState(
    character.inventory.find(
      (item) => item.equipped === true && item.slot === "food"
    )
  );
  const [equippedReference, setEquippedReference] = useState(
    character.inventory.find(
      (item) => item.equipped === true && item.slot === "reference"
    )
  );

  const algorithmsTotal =
    character.algorithms +
    (equippedGear ? equippedGear.algorithmsBoost : 0) +
    (equippedFood ? equippedFood.algorithmsBoost : 0) +
    (equippedReference ? equippedReference.algorithmsBoost : 0);

  const backendTotal =
    character.backend +
    (equippedGear ? equippedGear.backendBoost : 0) +
    (equippedFood ? equippedFood.backendBoost : 0) +
    (equippedReference ? equippedReference.backendBoost : 0);

  const frontendTotal =
    character.frontend +
    (equippedGear ? equippedGear.frontendBoost : 0) +
    (equippedFood ? equippedFood.frontendBoost : 0) +
    (equippedReference ? equippedReference.frontendBoost : 0);

  const cssTotal =
    character.css +
    (equippedGear ? equippedGear.cssBoost : 0) +
    (equippedFood ? equippedFood.cssBoost : 0) +
    (equippedReference ? equippedReference.cssBoost : 0);

  const debuggingTotal =
    character.debugging +
    (equippedGear ? equippedGear.debuggingBoost : 0) +
    (equippedFood ? equippedFood.debuggingBoost : 0) +
    (equippedReference ? equippedReference.debuggingBoost : 0);

  const energyTotal =
    character.maxEnergy +
    (equippedGear ? equippedGear.energyBoost : 0) +
    (equippedFood ? equippedFood.energyBoost : 0) +
    (equippedReference ? equippedReference.energyBoost : 0);

  return (
    <div id="container">
      <h3 id="header">{character.name}</h3>
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
          <span className="attribute">Sanity: {character.currSanity}</span>
          <span className="attribute">Max Sanity: {character.maxSanity}</span>
        </div>
      </div>
      <div id="equipped-items">
        <div id="equipped-gear-container">
          {equippedGear ? (
            <div
              id="equipped-gear"
              onClick={() => {
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
          {inventory.map((item, idx) => {
            if (item.slot === "gear" && !_.isEqual(equippedGear, item)) {
              return (
                <div
                  key={idx}
                  className="equipment-card"
                  onClick={() => {
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
          {inventory.map((item, idx) => {
            if (item.slot === "food" && !_.isEqual(equippedFood, item)) {
              return (
                <div
                  key={idx}
                  className="equipment-card"
                  onClick={() => {
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
          {inventory.map((item, idx) => {
            if (
              item.slot === "reference" &&
              !_.isEqual(equippedReference, item)
            ) {
              return (
                <div
                  key={idx}
                  className="equipment-card"
                  onClick={() => {
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
