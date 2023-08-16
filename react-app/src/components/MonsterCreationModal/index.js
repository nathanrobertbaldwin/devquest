import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createNewMonsterTemplateThunk } from "../../store/gamedata";
import { useModal } from "../../context/Modal";

import "./MonsterCreationModal.css";

const _ = require("lodash");

export default function CreateNewMonsterModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [name, setName] = useState("");
  const [hp, setHp] = useState(0);
  const [weakness, setWeakness] = useState("backend");
  const [imageUrl, setImageUrl] = useState("");

  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    _checkForErrors();
  }, [name, hp, weakness, imageUrl]);

  async function handleSubmit(e) {
    e.preventDefault();
    setHasSubmitted(true);

    if (_.isEmpty(validationErrors)) {
      const newMonsterData = {
        name,
        hp,
        weakness,
        image_url: imageUrl,
      };

      await dispatch(createNewMonsterTemplateThunk(newMonsterData));
      _reset();
      closeModal();
    }
  }

  function _checkForErrors() {
    const errors = {};
    if (!name || name.length > 20) errors.name = "Name required";
    if (hp <= 0) errors.hp = "Positive integer HP required.";
    if (imageUrl && !urlCheck(imageUrl))
      errors.imageUrl = "Image must end with .png, .jpg, or .jpeg";

    setValidationErrors(errors);
  }

  const urlCheck = (url) => {
    return (
      url.endsWith(".jpg") || url.endsWith(".png") || url.endsWith(".jpeg")
    );
  };

  function _reset() {
    setName("");
    setHp(0);
    setWeakness("algorithms");
    setImageUrl("");
  }

  return (
    <form id="new-monster-component-container">
      <div id="new-monster-header">
        <h4>Create New Monster!</h4>
      </div>
      <div className="new-monster-field-container">
        <div className="new-monster-input-wrapper">
          <span className="new-monster-label">Name:</span>
          <input
            className="new-monster-name-input"
            type="text"
            placeholder="monster Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {validationErrors.name && hasSubmitted && (
          <span className="error-message">{validationErrors.name}</span>
        )}
      </div>
      <div className="new-monster-field-container">
        <div className="new-monster-input-wrapper">
          <span>HP:</span>
          <input
            className="new-monster-input"
            type="text"
            placeholder="Hit Points"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
        </div>
        {validationErrors.hp && hasSubmitted && (
          <span className="error-message">{validationErrors.hp}</span>
        )}
      </div>

      <div className="new-monster-field-container">
        <div className="new-monster-input-wrapper">
          <span>Weakness: </span>
          <select
            id="weakness"
            value={weakness}
            onChange={(e) => setWeakness(e.target.value)}
          >
            <option value="backend">Backend</option>
            <option value="frontend">Frontend</option>
            <option value="debugging">Debugging</option>
            <option value="css">CSS</option>
            <option value="algorithms">Algorithms</option>
          </select>
        </div>
      </div>
      <div className="new-monster-field-container">
        <div className="new-monster-input-wrapper">
          <span>Image URL:</span>
          <input
            className="new-monster-input"
            type="text"
            placeholder="Image One"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        {validationErrors.imageUrl && hasSubmitted && (
          <span className="error-message">{validationErrors.imageUrl}</span>
        )}
      </div>
      <div id="new-monster-submit-button-container">
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Create!
        </button>
      </div>
    </form>
  );
}
