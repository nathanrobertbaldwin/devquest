import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import EditEquipmentModal from "../EditEquipmentModal";
import { deleteEquipmentByIdThunk } from "../../store/gamedata";

import "./EquipmentCard.css";

export default function EquipmentCard({ item }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  function handleDelete(id) {
    dispatch(deleteEquipmentByIdThunk(id));
  }

  return (
    <div key={item.id} className="item-card-container">
      <h6>{item.name}</h6>
      <span>id: {item.id}</span>
      <span>Algorithms Boost: {item.algorithmsBoost}</span>
      <span>Backend Boost: {item.backendBoost}</span>
      <span>CSS Boost: {item.cssBoost}</span>
      <span>Debugging Boost: {item.debuggingBoost}</span>
      <span>Frontend Boost: {item.frontendBoost}</span>
      <span>ImageUrl: {item.imageUrl}</span>
      <span>Max Energy Boost: {item.maxEnergyBoost}</span>
      <span>Slot: {item.slot}</span>
      <OpenModalButton
        buttonText="Edit Equipment"
        onItemClick={closeModal}
        modalComponent={<EditEquipmentModal itemId={item.id} />}
      />
      <button onClick={() => handleDelete(item.id)}>Delete</button>
    </div>
  );
}
