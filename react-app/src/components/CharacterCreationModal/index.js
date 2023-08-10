import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./CharacterCreationModal.css";

function CharacterCreationModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [algorithms, setAlgorithms] = useState(5);
  const [CSS, setCSS] = useState(5);
  const [databases, setDatabases] = useState(5);
  const [debugging, setDebugging] = useState(5);
  const [energy, setEnergy] = useState(50);
  const [points, setPoints] = useState(10);

  const [attacksRemaining, setAttacksRemaining] = useState(4);
  const [chosenAttacks, setChosenAttacks] = useState({});

  const characterAttacks = useSelector((store) => {
    return store.gamedata.characterAttacks;
  });

  return (
    <div id="character-creation-component-container">
      <h4 id="character-creation-h3">Create A New Character</h4>
      <h5 id="character-creation-attributes-header">Attributes</h5>
      <span id="character-creation-points-remaining">
        {points} points remaining
      </span>
      <div id="character-creation-attributes-container">
        <div className="attribute-button-container">
          <span>Algorithms: {algorithms}</span>
          <div className="button-container">
            <button
              onClick={() => {
                if (points > 0) {
                  setAlgorithms(algorithms + 1);
                  setPoints(points - 1);
                }
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                if (algorithms > 0) {
                  setAlgorithms(algorithms - 1);
                  setPoints(points + 1);
                }
              }}
            >
              -
            </button>
          </div>
        </div>
        <div class="attribute-button-container">
          <span>CSS: {CSS}</span>
          <div class="button-container">
            <button
              onClick={() => {
                if (points > 0) {
                  setCSS(CSS + 1);
                  setPoints(points - 1);
                }
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                if (CSS > 0) {
                  setCSS(CSS - 1);
                  setPoints(points + 1);
                }
              }}
            >
              -
            </button>
          </div>
        </div>
        <div class="attribute-button-container">
          <span>Databases: {databases}</span>
          <div class="button-container">
            <button
              onClick={() => {
                if (points > 0) {
                  setDatabases(databases + 1);
                  setPoints(points - 1);
                }
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                if (databases > 0) {
                  setDatabases(databases - 1);
                  setPoints(points + 1);
                }
              }}
            >
              -
            </button>
          </div>
        </div>
        <div class="attribute-button-container">
          <span>Debugging: {debugging}</span>
          <div class="button-container">
            <button
              onClick={() => {
                if (points > 0) {
                  setDebugging(debugging + 1);
                  setPoints(points - 1);
                }
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                if (debugging > 0) {
                  setDebugging(debugging - 1);
                  setPoints(points + 1);
                }
              }}
            >
              -
            </button>
          </div>
        </div>
        <div class="attribute-button-container">
          <span>Energy: {energy}</span>
          <div class="button-container">
            <button
              onClick={() => {
                if (points > 0) {
                  setEnergy(energy + 10);
                  setPoints(points - 1);
                }
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                if (energy > 0) {
                  setEnergy(energy - 10);
                  setPoints(points + 1);
                }
              }}
            >
              -
            </button>
          </div>
        </div>
      </div>
      <h5 id="character-creation-attacks-header">Chosen Attacks</h5>
      <span id="character-creation-choose-more-attacks-text">
        Choose {attacksRemaining} more attacks
      </span>
      <div id="character-creation-chosen-attacks">
        {Object.entries(chosenAttacks).map(([key, value]) => {
          return (
            <div
              key={key}
              onClick={() => {
                if (attacksRemaining < 4) {
                  let newChosenAttacks = chosenAttacks;
                  delete newChosenAttacks[key];
                  setChosenAttacks(newChosenAttacks);
                  setAttacksRemaining(attacksRemaining + 1);
                }
              }}
              className="character-creation-attack-card"
            >
              <span>Name: {value["name"]}</span>
              <span>Power: {value["power"]}</span>
              <span>Energy Cost: {value["energy_cost"]}</span>
              <span>Primary Stat: {value["primary_stat"]}</span>
            </div>
          );
        })}
      </div>
      <h5 id="character-creation-choose-attacks-header">Available Attacks</h5>
      <div id="character-creation-available-attacks">
        <div id="character-attack-cards-container">
          {Object.entries(characterAttacks).map(([key, value]) => {
            if (!chosenAttacks[key]) {
              return (
                <div
                  key={key}
                  onClick={() => {
                    if (attacksRemaining > 0 && !chosenAttacks[key]) {
                      let newChosenAttacks = chosenAttacks;
                      newChosenAttacks[key] = value;
                      setChosenAttacks(newChosenAttacks);
                      setAttacksRemaining(attacksRemaining - 1);
                    }
                  }}
                  className="character-creation-attack-card"
                >
                  <span>Name: {value["name"]}</span>
                  <span>Power: {value["power"]}</span>
                  <span>Energy Cost: {value["energy_cost"]}</span>
                  <span>Primary Stat: {value["primary_stat"]}</span>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default CharacterCreationModal;
