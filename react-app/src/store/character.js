// ============================== IMPORTS ================================ //

import { flattenInventory } from "./utilities";
import { getNewCharSave } from "./saves";

// =========================== ACTION STRINGS ============================ //

const GET_CHARACTER_DATA = "character_data/GET";
const CREATE_NEW_CHARACTER = "character_data/POST";
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
      console.log("THIS IS FROM THE REDUCER", character);
      return { ...state, ...character };
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
