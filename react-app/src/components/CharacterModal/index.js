import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./CharacterModal.css";
import { getCharacterDataThunk } from "../../store/character";

function CharacterModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [isLoaded, setIsLoaded] = useState(false);
  const character = useSelector((store) => store.character)[0];

  useEffect(() => {
    if (!character) {
      dispatch(getCharacterDataThunk(1)).then(() => {
        setIsLoaded(true);
      });
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  if (!isLoaded) return <></>;

  const attacks = character.attacks;
  const inventory = character.inventory;
  console.log(attacks);
  console.log(inventory);

  return (
    <div id="container">
      <h3 id="header">Inventory</h3>
      <div id="avatar">
        <div id="avatar-image-container"></div>
        <div id="attributes-container">
          <h5>Attributes</h5>
          <span className="attribute">Algos: {character.algorithms}</span>
          <span className="attribute">Backend: {character.backend}</span>
          <span className="attribute">Frontend: {character.frontend}</span>
          <span className="attribute">CSS: {character.css}</span>
          <span className="attribute">Debugging: {character.debugging}</span>
          <span className="attribute">Energy: {character.energy}</span>
        </div>
      </div>
      <div id="equipped-items">
        <div id="equipped-gear">Gear</div>
        <div id="equipped-food">Food</div>
        <div id="equipped-reference">Reference</div>
      </div>
      <div id="attacks"></div>
      <div id="inventory">
        <div id="inventory-gear">
          <div className="equipment-card">gear</div>
          <div className="equipment-card">gear</div>
          <div className="equipment-card">gear</div>
          <div className="equipment-card">gear</div>
        </div>
        <div id="inventory-food">
          <div className="equipment-card">food</div>
          <div className="equipment-card">food</div>
          <div className="equipment-card">food</div>
          <div className="equipment-card">food</div>
        </div>
        <div id="inventory-reference">
          <div className="equipment-card">reference</div>
          <div className="equipment-card">reference</div>
          <div className="equipment-card">reference</div>
          <div className="equipment-card">reference</div>
        </div>
      </div>
    </div>
  );
}

export default CharacterModal;
