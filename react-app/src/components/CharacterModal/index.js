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
      <div id="attacks">
        {Object.entries(attacks).map(([key, value]) => {
          return (
            <div key={key} className="item-card">
              <span>Name: {value["name"]}</span>
              <span>Power: {value["power"]}</span>
              <span>Energy Cost: {value["energy_cost"]}</span>
              <span>Primary Stat: {value["primary_stat"]}</span>
            </div>
          );
        })}
      </div>
      <div id="inventory">
        <h5>Gear</h5>
        <div id="inventory-gear">
          {Object.values(inventory).map((item, idx) => {
            if (item.item.slot === "gear") {
              return (
                <div key={idx} className="equipment-card">
                  <span>Name: {item.item.name}</span>
                </div>
              );
            }
          })}
        </div>
        <h5>Food</h5>
        <div id="inventory-food">
          {Object.values(inventory).map((item, idx) => {
            if (item.item.slot === "food") {
              return (
                <div key={idx} className="equipment-card">
                  <span>Name: {item.item.name}</span>
                </div>
              );
            }
          })}
        </div>
        <h5>Reference</h5>
        <div id="inventory-reference">
          {Object.values(inventory).map((item, idx) => {
            if (item.item.slot === "reference") {
              return (
                <div key={idx} className="equipment-card">
                  <span>Name: {item.item.name}</span>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default CharacterModal;
