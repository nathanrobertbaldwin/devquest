import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNewCharacterThunk } from "../../store/character";
import { useModal } from "../../context/Modal";

import "../../styles/CharacterCreationModal.css";

const _ = require("lodash");

function CharacterCreationModal({ toggleGameState }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const sessionUser = useSelector((store) => store.session.user);
  const characterAttacks = useSelector((store) => {
    return store.gamedata.characterAttacks;
  });

  const [name, setName] = useState("");
  const [backend, setBackend] = useState(5);
  const [frontend, setFrontend] = useState(5);
  const [algorithms, setAlgorithms] = useState(5);
  const [CSS, setCSS] = useState(5);
  const [debugging, setDebugging] = useState(5);
  const [energy, setEnergy] = useState(50);
  const [points, setPoints] = useState(10);
  const [chosenAttacks, setChosenAttacks] = useState({});

  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  let chosenAttacksLength = Object.values(chosenAttacks).length;

  useEffect(() => {
    _checkForErrors();
  }, [name, points, chosenAttacks]);

  async function handleSubmit(e) {
    e.preventDefault();
    setHasSubmitted(true);

    if (_.isEmpty(validationErrors)) {
      const attacks = Object.values(chosenAttacks);

      const newCharacterData = {
        name,
        user_id: sessionUser.id,
        backend,
        frontend,
        algorithms,
        css: CSS,
        debugging,
        energy,
        attack_one: attacks[0].id,
        attack_two: attacks[1].id,
        attack_three: attacks[2].id,
        attack_four: attacks[3].id,
      };

      await dispatch(createNewCharacterThunk(newCharacterData));
      _reset();
      toggleGameState("combat");
      closeModal();
    }
  }

  function _checkForErrors() {
    const errors = {};
    if (name.length < 4 || name.length > 10)
      errors.name = "Error: Enter name between 4 and 10 characters. ";
    if (points > 0) errors.points = "Error: You must spend all points. ";
    if (chosenAttacksLength !== 4) {
      errors.chosenAttacks = "Error: Choose 4 attacks. ";
    }
    setValidationErrors(errors);
  }

  function _reset() {
    setName("");
    setBackend(5);
    setFrontend(5);
    setAlgorithms(5);
    setCSS(5);
    setDebugging(5);
    setEnergy(50);
    setPoints(10);
    setChosenAttacks({});

    setValidationErrors({});
    setHasSubmitted(false);
  }

  return (
    <div id="new-character-component-container">
      <form id="new-character-form" onSubmit={(e) => handleSubmit(e)}>
        <div id="header">
          <h4>Name Your Character</h4>
          <div className="name-field-container">
            <input
              className="name-input"
              type="text"
              placeholder="What's your name?"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button type="submit">Begin!</button>
        </div>
        <div id="character-creation-errors">
          {!_.isEmpty(validationErrors) &&
            hasSubmitted &&
            Object.values(validationErrors).map((error, idx) => {
              return (
                <pre key={idx} className="error-message">
                  {error}
                </pre>
              );
            })}
        </div>
        <h5 id="attributes-header">Attributes</h5>
        <span id="points-remaining">{points} points remaining</span>
        <div id="cc-attributes-container">
          <div className="attribute-button-container">
            <span>Backend: {backend}</span>
            <div className="button-container">
              <button
                type="button"
                onClick={() => {
                  if (points > 0) {
                    setBackend(backend + 1);
                    setPoints(points - 1);
                  }
                }}
              >
                +
              </button>
              <button
                type="button"
                onClick={() => {
                  if (backend > 1) {
                    setBackend(backend - 1);
                    setPoints(points + 1);
                  }
                }}
              >
                -
              </button>
            </div>
          </div>
          <div className="attribute-button-container">
            <span>Frontend: {frontend}</span>
            <div className="button-container">
              <button
                type="button"
                onClick={() => {
                  if (points > 0) {
                    setFrontend(frontend + 1);
                    setPoints(points - 1);
                  }
                }}
              >
                +
              </button>
              <button
                type="button"
                onClick={() => {
                  if (frontend > 1) {
                    setFrontend(frontend - 1);
                    setPoints(points + 1);
                  }
                }}
              >
                -
              </button>
            </div>
          </div>
          <div className="attribute-button-container">
            <span>Algorithms: {algorithms}</span>
            <div className="button-container">
              <button
                type="button"
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
                type="button"
                onClick={() => {
                  if (algorithms > 1) {
                    setAlgorithms(algorithms - 1);
                    setPoints(points + 1);
                  }
                }}
              >
                -
              </button>
            </div>
          </div>
          <div className="attribute-button-container">
            <span>CSS: {CSS}</span>
            <div className="button-container">
              <button
                type="button"
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
                type="button"
                onClick={() => {
                  if (CSS > 1) {
                    setCSS(CSS - 1);
                    setPoints(points + 1);
                  }
                }}
              >
                -
              </button>
            </div>
          </div>
          <div className="attribute-button-container">
            <span>Debugging: {debugging}</span>
            <div className="button-container">
              <button
                type="button"
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
                type="button"
                onClick={() => {
                  if (debugging > 1) {
                    setDebugging(debugging - 1);
                    setPoints(points + 1);
                  }
                }}
              >
                -
              </button>
            </div>
          </div>
          <div className="attribute-button-container">
            <span>Energy: {energy}</span>
            <div className="button-container">
              <button
                type="button"
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
                type="button"
                onClick={() => {
                  if (energy > 10) {
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
        <h5 id="attacks-header">Chosen Attacks</h5>
        <span id="choose-more-attacks-text">
          Choose {4 - chosenAttacksLength} more attacks
        </span>
        <div id="chosen-attacks-container">
          <div id="chosen-attacks">
            {Object.entries(chosenAttacks).map(([key, value]) => {
              return (
                <div
                  className="cc-attack-card"
                  key={key}
                  onClick={() => {
                    delete chosenAttacks[key];
                    setChosenAttacks({ ...chosenAttacks });
                  }}
                >
                  <span>Name: {value["name"]}</span>
                  <span>Power: {value["power"]}</span>
                  <span>Energy Cost: {value["energyCost"]}</span>
                  <span>Primary Stat: {value["primaryStat"]}</span>
                </div>
              );
            })}
          </div>
        </div>
        <h5 id="choose-attacks-header">Available Attacks</h5>
        <div id="available-attacks">
          <div id="character-available-attack-cards-container">
            {Object.entries(characterAttacks).map(([key, value]) => {
              if (!chosenAttacks[key]) {
                return (
                  <div
                    key={key}
                    className="cc-attack-card"
                    onClick={() => {
                      if (chosenAttacksLength < 4) {
                        setChosenAttacks({
                          ...chosenAttacks,
                          [key]: characterAttacks[key],
                        });
                      }
                    }}
                  >
                    <span>Name: {value["name"]}</span>
                    <span>Power: {value["power"]}</span>
                    <span>Energy Cost: {value["energyCost"]}</span>
                    <span>Primary Stat: {value["primaryStat"]}</span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </form>
    </div>
  );
}

export default CharacterCreationModal;
