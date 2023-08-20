import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editMonsterTemplateByIdThunk } from "../../store/gamedata";
import { useModal } from "../../context/Modal";

import "../../styles/EditMonsterModal.css";

const _ = require("lodash");

export default function EditMonsterModal({ monsterId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const monster = useSelector((store) => store.gamedata.monsterTemplates)[
    monsterId
  ];

  const [name, setName] = useState(monster.name);
  const [hp, setHp] = useState(monster.hp);
  const [weakness, setWeakness] = useState(monster.weakness);
  const [imageUrl, setImageUrl] = useState(
    monster.imageUrl ? monster.imageUrl : ""
  );

  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    _checkForErrors();
  }, [name, hp, weakness, imageUrl]);

  async function handleSubmit(e) {
    e.preventDefault();
    setHasSubmitted(true);

    if (_.isEmpty(validationErrors)) {
      const editedMonsterData = {
        name,
        hp,
        weakness,
        image_url: imageUrl,
      };

      await dispatch(
        editMonsterTemplateByIdThunk(monster.id, editedMonsterData)
      );
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
    setHp(0);
    setWeakness("algorithms");
    setImageUrl("");
  }

  return (
    <form id="edit-monster-component-container">
      <div id="edit-monster-header">
        <h4>Edit Monster!</h4>
      </div>
      <div className="edit-monster-field-container">
        <div className="edit-monster-input-wrapper">
          <span className="edit-monster-label">Name:</span>
          <input
            className="edit-monster-name-input"
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
      <div className="edit-monster-field-container">
        <div className="edit-monster-input-wrapper">
          <span>HP:</span>
          <input
            className="edit-monster-input"
            type="text"
            placeholder="Hit Points"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
        </div>
        {validationErrors.imgUrl && hasSubmitted && (
          <span className="error-message">{validationErrors.imageUrl}</span>
        )}
      </div>
      <div id="edit-monster-section-container">
        <div className="edit-monster-field-container">
          <div className="edit-monster-input-wrapper">
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
        <div className="edit-monster-field-container">
          <div className="edit-monster-input-wrapper">
            <span>Image URL:</span>
            <input
              className="edit-monster-input"
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
      <div id="edit-monster-submit-button-container">
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Edit!
        </button>
      </div>
    </form>
  );
}
