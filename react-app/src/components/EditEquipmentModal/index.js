import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editEquipmentByIdThunk } from "../../store/gamedata";
import { useModal } from "../../context/Modal";

import "./EditEquipmentModal.css";

const _ = require("lodash");

export default function CreateNewEquipmentModal({ itemId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const item = useSelector((store) => store.gamedata.equipment)[itemId];

  const [name, setName] = useState(item.name);
  const [backendBoost, setBackendBoost] = useState(item.backendBoost);
  const [frontendBoost, setFrontendBoost] = useState(item.frontendBoost);
  const [algorithmsBoost, setAlgorithmsBoost] = useState(item.algorithmsBoost);
  const [CSSBoost, setCSSBoost] = useState(item.cssBoost);
  const [debuggingBoost, setDebuggingBoost] = useState(item.debuggingBoost);
  const [maxEnergyBoost, setMaxEnergyBoost] = useState(item.maxEnergyBoost);
  const [slot, setSlot] = useState(item.slot);
  const [imageUrl, setImageUrl] = useState(item.imageUrl);

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
      const editedEquipmentData = {
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

      await dispatch(editEquipmentByIdThunk(itemId, editedEquipmentData));
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
    setBackendBoost(0);
    setFrontendBoost(0);
    setAlgorithmsBoost(0);
    setCSSBoost(0);
    setDebuggingBoost(0);
    setMaxEnergyBoost(0);
    setSlot("gear");
    setImageUrl("");
  }

  return (
    <form id="edit-equipment-component-container">
      <div id="edit-equipment-header">
        <h4>Edit Equipment</h4>
      </div>
      <div className="edit-equipment-field-container">
        <div className="edit-equipment-input-wrapper">
          <span className="edit-equipment-label">Name:</span>
          <input
            className="edit-equipment-name-input"
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
      <div id="edit-equipment-attributes-container">
        <div className="edit-equipment-attribute-button-container">
          <span>Backend Boost: {backendBoost}</span>
          <div className="edit-equipment-button-container">
            <button
              type="button"
              onClick={() => {
                setBackendBoost(backendBoost + 1);
              }}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {
                if (backendBoost > 0) {
                  setBackendBoost(backendBoost - 1);
                }
              }}
            >
              -
            </button>
          </div>
        </div>
        <div className="edit-equipment-attribute-button-container">
          <span>Frontend Boost: {frontendBoost}</span>
          <div className="edit-equipment-button-container">
            <button
              type="button"
              onClick={() => {
                setFrontendBoost(frontendBoost + 1);
              }}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {
                if (frontendBoost > 0) {
                  setFrontendBoost(frontendBoost - 1);
                }
              }}
            >
              -
            </button>
          </div>
        </div>
        <div className="edit-equipment-attribute-button-container">
          <span>Algorithms Boost: {algorithmsBoost}</span>
          <div className="edit-equipment-button-container">
            <button
              type="button"
              onClick={() => {
                setAlgorithmsBoost(algorithmsBoost + 1);
              }}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {
                if (algorithmsBoost > 0) {
                  setAlgorithmsBoost(algorithmsBoost - 1);
                }
              }}
            >
              -
            </button>
          </div>
        </div>
        <div className="edit-equipment-attribute-button-container">
          <span>CSS Boost: {CSSBoost}</span>
          <div className="edit-equipment-button-container">
            <button
              type="button"
              onClick={() => {
                setCSSBoost(CSSBoost + 1);
              }}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {
                if (CSSBoost > 0) {
                  setCSSBoost(CSSBoost - 1);
                }
              }}
            >
              -
            </button>
          </div>
        </div>
        <div className="edit-equipment-attribute-button-container">
          <span>Debugging Boost: {debuggingBoost}</span>
          <div className="edit-equipment-button-container">
            <button
              type="button"
              onClick={() => {
                setDebuggingBoost(debuggingBoost + 1);
              }}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {
                if (debuggingBoost > 0) {
                  setDebuggingBoost(debuggingBoost - 1);
                }
              }}
            >
              -
            </button>
          </div>
        </div>
        <div className="edit-equipment-attribute-button-container">
          <span>Max Energy Boost: {maxEnergyBoost}</span>
          <div className="edit-equipment-button-container">
            <button
              type="button"
              onClick={() => {
                setMaxEnergyBoost(maxEnergyBoost + 5);
              }}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => {
                if (maxEnergyBoost > 0) {
                  setMaxEnergyBoost(Math.max(0, maxEnergyBoost - 5));
                }
              }}
            >
              -
            </button>
          </div>
        </div>
        <div>
          <div className="edit-equipment-field-container">
            <div className="edit-equipment-input-wrapper">
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
        <div className="edit-equipment-field-container">
          <div className="edit-equipment-input-wrapper">
            <span>Image URL:</span>
            <input
              className="edit-equipment-input"
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
      <div id="edit-equipment-submit-button-container">
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Edit!
        </button>
      </div>
    </form>
  );
}
