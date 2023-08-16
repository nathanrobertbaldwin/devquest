import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { editCharacterStatsThunk } from "../../store/character";
import { useModal } from "../../context/Modal";
import "./CharacterBonusModal.css";

export default function CharacterBonusModal({
  stats,
  setBoonApplied,
  toggleGameState,
}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const char = useSelector((store) => store.character);

  const [points, setPoints] = useState(stats);
  const [backend, setBackend] = useState(char.backend);
  const [frontend, setFrontend] = useState(char.frontend);
  const [algorithms, setAlgorithms] = useState(char.algorithms);
  const [CSS, setCSS] = useState(char.css);
  const [debugging, setDebugging] = useState(char.debugging);
  const [maxEnergy, setMaxEnergy] = useState(char.maxEnergy);

  const baseBackend = char.backend;
  const baseFrontend = char.frontend;
  const baseAlgorithms = char.algorithms;
  const baseCSS = char.css;
  const baseDebugging = char.debugging;
  const baseMaxEnergy = char.maxEnergy;

  async function handleSubmit() {
    const editedCharacterData = {
      backend,
      frontend,
      algorithms,
      css: CSS,
      debugging,
      max_energy: maxEnergy,
    };
    await dispatch(editCharacterStatsThunk(char.id, editedCharacterData));
    setBoonApplied(true);
    closeModal();
    setTimeout(toggleGameState, 1000, "combat");
  }

  return (
    <div id="edit-character-attributes-container">
      <h6>Allocate Points</h6>
      <span>{points} points remaining.</span>
      <div className="edit-character-field-container">
        <span>Backend: {backend}</span>
        <div className="edit-character-button-container">
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
              if (backend > baseBackend) {
                setBackend(backend - 1);
                setPoints(points + 1);
              }
            }}
          >
            -
          </button>
        </div>
      </div>
      <div className="edit-character-field-container">
        <span>Frontend: {frontend}</span>
        <div className="edit-character-button-container">
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
              if (frontend > baseFrontend) {
                setFrontend(frontend - 1);
                setPoints(points + 1);
              }
            }}
          >
            -
          </button>
        </div>
      </div>
      <div className="edit-character-field-container">
        <span>Algorithms: {algorithms}</span>
        <div className="edit-character-button-container">
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
              if (algorithms > baseAlgorithms) {
                setAlgorithms(algorithms - 1);
                setPoints(points + 1);
              }
            }}
          >
            -
          </button>
        </div>
      </div>
      <div className="edit-character-field-container">
        <span>CSS: {CSS}</span>
        <div className="edit-character-button-container">
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
              if (CSS > baseCSS) {
                setCSS(CSS - 1);
                setPoints(points + 1);
              }
            }}
          >
            -
          </button>
        </div>
      </div>
      <div className="edit-character-field-container">
        <span>Debugging: {debugging}</span>
        <div className="edit-character-button-container">
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
              if (debugging > baseDebugging) {
                setDebugging(debugging - 1);
                setPoints(points + 1);
              }
            }}
          >
            -
          </button>
        </div>
      </div>
      <div className="edit-character-field-container">
        <span>Max Energy: {maxEnergy}</span>
        <div className="edit-character-button-container">
          <button
            type="button"
            onClick={() => {
              if (points > 0) {
                setMaxEnergy(maxEnergy + 10);
                setPoints(points - 1);
              }
            }}
          >
            +
          </button>
          <button
            type="button"
            onClick={() => {
              if (maxEnergy > baseMaxEnergy) {
                setMaxEnergy(maxEnergy - 10);
                setPoints(points + 1);
              }
            }}
          >
            -
          </button>
        </div>
      </div>
      <button onClick={() => handleSubmit()}>Save Character</button>
    </div>
  );
}
