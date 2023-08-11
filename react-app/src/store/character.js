// ============================== IMPORTS ================================ //

import { flattenInventory } from "./utilities";
import { deleteSaveFile, getNewCharSave } from "./saves";

// =========================== ACTION STRINGS ============================ //

const GET_CHARACTER_DATA = "character_data/GET";
const CREATE_NEW_CHARACTER = "character_data/POST";
const DELETE_CHARACTER = "character/DELETE";
const RESET_CHARACTER_DATA = "character_data/RESET";

// ============================== ACTIONS ============================== //

const getCharacterData = (data) => ({
  type: GET_CHARACTER_DATA,
  data: data,
});

const createNewCharacter = (newCharacter) => ({
  type: CREATE_NEW_CHARACTER,
  data: newCharacter,
});

const deleteCharacter = () => ({
  type: DELETE_CHARACTER,
  data: {},
});

const resetCharacterData = () => ({
  type: RESET_CHARACTER_DATA,
  data: {},
});

// ============================== THUNKS =============================== //

export const getCharacterDataThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/characters/${id}`);

  if (response.ok) {
    const character = await response.json();
    const inventory_data = character.inventory;
    const inventory = flattenInventory(inventory_data);
    character.inventory = inventory;
    dispatch(getCharacterData(character));
    return character;
  }
};

export const createNewCharacterThunk = (character) => async (dispatch) => {
  const response = await fetch(`/api/characters/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(character),
  });

  if (response.ok) {
    const newCharacterCreationData = await response.json();
    const newCharacter = newCharacterCreationData.new_character;
    const inventory_data = newCharacter.inventory;
    character.inventory = flattenInventory(inventory_data);
    dispatch(createNewCharacter(newCharacter));
    const newSaveData = newCharacterCreationData.new_save;
    dispatch(getNewCharSave(newSaveData));
    return newCharacter;
  }
};

export const deleteCharacterDataThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/characters/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteCharacter());
    dispatch(deleteSaveFile(data.save_slot));
  }
};

export const resetCharacterDataThunk = () => async (dispatch) => {
  dispatch(resetCharacterData());
};

// ============================== REDUCER ============================== //

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHARACTER_DATA: {
      const character = action.data;
      return { ...state, ...character };
    }
    case CREATE_NEW_CHARACTER: {
      const character = action.data;
      return { ...state, ...character };
    }
    case DELETE_CHARACTER: {
      const data = action.data;
      return { ...data };
    }
    case RESET_CHARACTER_DATA: {
      const data = action.data;
      return { ...data };
    }
    default: {
      return state;
    }
  }
}
