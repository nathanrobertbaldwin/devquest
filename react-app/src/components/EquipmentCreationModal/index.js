import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createNewEquipmentThunk } from "../../store/gamedata";
import { useModal } from "../../context/Modal";

import "../../styles/EquipmentCreationModal.css";

const _ = require("lodash");

export default function CreateNewEquipmentModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [name, setName] = useState("");
  const [backendBoost, setBackendBoost] = useState(0);
  const [frontendBoost, setFrontendBoost] = useState(0);
  const [algorithmsBoost, setAlgorithmsBoost] = useState(0);
  const [CSSBoost, setCSSBoost] = useState(0);
  const [debuggingBoost, setDebuggingBoost] = useState(0);
  const [maxEnergyBoost, setMaxEnergyBoost] = useState(0);
  const [slot, setSlot] = useState("gear");
  const [imageUrl, setImageUrl] = useState("");
  const [points, setPoints] = useState(15);

  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    _checkForErrors();
  }, [
    name,
    backendBoost,
    frontendBoost,
    algorithmsBoost,
    CSSBoost,
    maxEnergyBoost,
    slot,
    imageUrl,
  ]);

  async function handleSubmit(e) {
    e.preventDefault();
    setHasSubmitted(true);

    if (_.isEmpty(validationErrors)) {
      const newEquipmentData = {
        name,
        backend_boost: backendBoost,
        frontend_boost: frontendBoost,
        algorithms_boost: algorithmsBoost,
        css_boost: CSSBoost,
        debugging_boost: debuggingBoost,
        max_energy_boost: maxEnergyBoost,
        slot: slot,
        image_url: imageUrl,
      };

      await dispatch(createNewEquipmentThunk(newEquipmentData));
      _reset();
      closeModal();
    }
  }

  function _checkForErrors() {
    const errors = {};
    if (!name || name.length > 20) errors.name = "Name required";
    if (imageUrl && !urlCheck(imageUrl))
      errors.imgUrl = "Image must end with .png, .jpg, or .jpeg";

    setValidationErrors(errors);
  }

  const urlCheck = (url) => {
    return (
      url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".jpeg")
    );
  };

  function _reset() {
    setName("");
    setBackendBoost("");
    setFrontendBoost("");
    setAlgorithmsBoost("");
    setCSSBoost("");
    setDebuggingBoost("");
    setMaxEnergyBoost("");
    setImageUrl("");
  }

  return (
    <form id="new-equipment-component-container">
      <div id="new-equipment-header">
        <h4>Create New Equipment!</h4>
      </div>
      <div className="new-equipment-field-container">
        <div className="new-equipment-input-wrapper">
          <span className="new-equipment-label">Name:</span>
          <input
            className="new-equipment-name-input"
            type="text"
            placeholder="Equipment Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {validationErrors.name && hasSubmitted && (
          <span className="error-message">{validationErrors.name}</span>
        )}
      </div>
      <h6 id="new-equipment-attributes-header">
        Attribute Boosts - Points Remaining: {points}
      </h6>
      <div id="new-equipment-attributes-container">
        <div className="new-equipment-attribute-button-container">
          <span>Backend Boost: {backendBoost}</span>
          <div className="new-equipment-button-container">
            <button
              type="button"
              onClick={() => {
                if (points > 0) {
                  setBackendBoost(backendBoost + 1);
                  setPoints(points - 1);
                }
              }}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {
                if (backendBoost > 0) {
                  setBackendBoost(backendBoost - 1);
                  setPoints(points + 1);
                }
              }}
            >
              -
            </button>
          </div>
        </div>
        <div className="new-equipment-attribute-button-container">
          <span>Frontend Boost: {frontendBoost}</span>
          <div className="new-equipment-button-container">
            <button
              type="button"
              onClick={() => {
                if (points > 0) {
                  setFrontendBoost(frontendBoost + 1);
                  setPoints(points - 1);
                }
              }}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {
                if (frontendBoost > 0) {
                  setFrontendBoost(frontendBoost - 1);
                  setPoints(points + 1);
                }
              }}
            >
              -
            </button>
          </div>
        </div>
        <div className="new-equipment-attribute-button-container">
          <span>Algorithms Boost: {algorithmsBoost}</span>
          <div className="new-equipment-button-container">
            <button
              type="button"
              onClick={() => {
                if (points > 0) {
                  setAlgorithmsBoost(algorithmsBoost + 1);
                  setPoints(points - 1);
                }
              }}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {
                if (algorithmsBoost > 0) {
                  setAlgorithmsBoost(algorithmsBoost - 1);
                  setPoints(points + 1);
                }
              }}
            >
              -
            </button>
          </div>
        </div>
        <div className="new-equipment-attribute-button-container">
          <span>CSS Boost: {CSSBoost}</span>
          <div className="new-equipment-button-container">
            <button
              type="button"
              onClick={() => {
                if (points > 0) {
                  setCSSBoost(CSSBoost + 1);
                  setPoints(points - 1);
                }
              }}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {
                if (CSS > 0) {
                  setCSSBoost(CSSBoost - 1);
                  setPoints(points + 1);
                }
              }}
            >
              -
            </button>
          </div>
        </div>
        <div className="new-equipment-attribute-button-container">
          <span>Debugging Boost: {debuggingBoost}</span>
          <div className="new-equipment-button-container">
            <button
              type="button"
              onClick={() => {
                if (points > 0) {
                  setDebuggingBoost(debuggingBoost + 1);
                  setPoints(points - 1);
                }
              }}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {
                if (debuggingBoost > 0) {
                  setDebuggingBoost(debuggingBoost - 1);
                  setPoints(points + 1);
                }
              }}
            >
              -
            </button>
          </div>
        </div>
        <div className="new-equipment-attribute-button-container">
          <span>Max Energy Boost: {maxEnergyBoost}</span>
          <div className="new-equipment-button-container">
            <button
              type="button"
              onClick={() => {
                if (points > 0) {
                  setMaxEnergyBoost(maxEnergyBoost + 5);
                  setPoints(points - 1);
                }
              }}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {
                setMaxEnergyBoost(maxEnergyBoost - 5);
                setPoints(points + 1);
              }}
            >
              -
            </button>
          </div>
        </div>
        <div>
          <div className="new-equipment-field-container">
            <div className="new-equipment-input-wrapper">
              <span>Slot: </span>
              <select
                id="slot"
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
              >
                <option value="gear">Gear</option>
                <option value="food">Food</option>
                <option value="reference">Reference</option>
              </select>
            </div>
          </div>
        </div>
        <div className="new-equipment-field-container">
          <div className="new-equipment-input-wrapper">
            <span>Image URL:</span>
            <input
              className="new-equipment-input"
              type="text"
              placeholder="Image One"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          {validationErrors.imgUrl && hasSubmitted && (
            <span className="error-message">{validationErrors.imageUrl}</span>
          )}
        </div>
      </div>
      <div id="new-equipment-submit-button-container">
        {points === 0 && (
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Create!
          </button>
        )}
      </div>
    </form>
  );
}
