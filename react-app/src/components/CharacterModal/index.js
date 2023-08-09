import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./CharacterModal.css";

function CharacterModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Saves</h1>
    </div>
  );
}

export default CharacterModal;
