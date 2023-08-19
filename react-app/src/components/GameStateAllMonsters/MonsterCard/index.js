import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import OpenModalButton from "../../OpenModalButton";
import EditMonsterModal from "../../EditMonsterModal";
import { deleteMonsterTemplateByIdThunk } from "../../../store/gamedata";

import "../../../styles/MonsterCard.css";

export default function MonsterCard({ monster }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  function handleDelete(id) {
    dispatch(deleteMonsterTemplateByIdThunk(id));
  }

  return (
    <div key={monster.id} className="monster-card-container">
      <h6>{monster.name}</h6>
      <span>Monster Id: {monster.id}</span>
      <span>HP: {monster.hp}</span>
      <span>Weakness: {monster.weakness}</span>
      <OpenModalButton
        buttonText="Edit"
        onItemClick={closeModal}
        modalComponent={<EditMonsterModal monsterId={monster.id} />}
      />
      <button onClick={() => handleDelete(monster.id)}>Delete</button>
    </div>
  );
}
