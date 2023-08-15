import { useState } from "react";
import "./CharacterBonusModal.css";
import { useSelector } from "react-redux";

export default function CharacterBonusModal({ stats }) {
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

  // tomorrow test update of character.

  return (
    <>
      <div id="character-attributes-container">
        <form>
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
                    if (algorithms && baseAlgorithms) {
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
            <div className="attribute-button-container">
              <span>Max Energy: {maxEnergy}</span>
              <div className="button-container">
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
          </div>
        </form>
      </div>
    </>
  );
}
