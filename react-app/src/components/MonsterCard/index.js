import OpenModalButton from "../OpenModalButton";
import EditMonsterModal from "../EditMonsterModal";
import { useModal } from "../../context/Modal";
import "./MonsterCard.css";

export default function MonsterCard({ monster }) {
  const { closeModal } = useModal();
  return (
    <div key={monster.id} className="monster-card-container">
      <h6>Name: {monster.name}</h6>
      <span>id: {monster.id}</span>
      <span>HP {monster.hp}</span>
      <span>Weakness: {monster.weakness}</span>
      <OpenModalButton
        buttonText="Edit Monster"
        onItemClick={closeModal}
        modalComponent={<EditMonsterModal monsterId={monster.id} />}
      />
    </div>
  );
}
