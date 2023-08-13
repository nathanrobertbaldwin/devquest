// ============================== IMPORTS ================================ //

import { flattenInventory } from "./utilities";
import { deleteSaveFile, getNewCharSave } from "./saves";

// =========================== ACTION STRINGS ============================ //

const GET_CHARACTER_DATA = "character_data/GET";
const CREATE_NEW_CHARACTER = "character_data/POST";
const TOGGLE_INVENTORY_ITEM_EQUIP = "inventory_item_equip/TOGGLE";
const DROP_INVENTORY_ITEM = "inventory_item/DROP";
const SPEND_CHARACTER_ENERGY = "character_energy/SPEND";
const UPDATE_CHARACTER_SANITY = "character_sanity/UPDATE";
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

export const toggleInventoryItemEquip = (itemId) => ({
  type: TOGGLE_INVENTORY_ITEM_EQUIP,
  data: itemId,
});

export const dropInventoryItem = (itemId) => ({
  type: DROP_INVENTORY_ITEM,
  data: itemId,
});

const spendCharacterEnergy = (cost) => ({
  type: SPEND_CHARACTER_ENERGY,
  data: cost,
});

const udpateCharacterSanity = (damage) => ({
  type: UPDATE_CHARACTER_SANITY,
  data: damage,
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
    const inventoryData = newCharacter.inventory;
    character.inventory = flattenInventory(inventoryData);
    dispatch(createNewCharacter(newCharacter));
    const newSaveData = newCharacterCreationData.new_save;
    dispatch(getNewCharSave(newSaveData));
    return newCharacter;
  }
};

export const toggleInventoryItemEquipThunk = (itemId) => async (dispatch) => {
  const response = await fetch(`/api/characters/inventory/${itemId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = response.json();
    // console.log("From toggleInventoryItemThunk", data);
    dispatch(toggleInventoryItemEquip(itemId));
  }
};

export const dropInventoryItemThunk = (itemId) => async (dispatch) => {
  const response = await fetch(`/api/characters/inventory/${itemId}/drop`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = response.json();
    // console.log("From dropInventoryItemThunk", data);
    dispatch(dropInventoryItem(itemId));
  }
};

export const spendCharacterEnergyThunk = (charId, cost) => async (dispatch) => {
  const response = await fetch(`api/characters/${charId}/energy`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cost }),
  });
  if (response.ok) {
    const data = await response.json();
    // console.log("from spendCharacterEnergyThunk:", data);
    dispatch(spendCharacterEnergy(cost));
  }
};

export const udpateCharacterSanityThunk =
  (charId, damage) => async (dispatch) => {
    const response = await fetch(`api/characters/${charId}/sanity`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ damage }),
    });
    if (response.ok) {
      const data = await response.json();
      // console.log("from updateCharacterSanityThunk:", data);
      dispatch(udpateCharacterSanity(damage));
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
    case TOGGLE_INVENTORY_ITEM_EQUIP: {
      const itemId = action.data;
      const newState = { ...state };
      const inventory = newState.inventory;
      console.log("BEFORE TOGGLE", inventory[itemId].equipped);
      inventory[itemId].equipped = !inventory[itemId].equipped;
      console.log("AFTER TOGGLE", inventory[itemId].equipped);
      return newState;
    }
    case DROP_INVENTORY_ITEM: {
      const itemId = action.data;
      const newState = { ...state };
      delete newState.inventory[itemId];
      return newState;
    }
    case SPEND_CHARACTER_ENERGY: {
      const cost = action.data;
      const newState = { ...state };
      newState.currEnergy = Math.max(0, newState.currEnergy - cost);
      return newState;
    }
    case UPDATE_CHARACTER_SANITY: {
      const damage = action.data;
      const newState = state;
      newState.currSanity = Math.max(0, newState.currSanity - damage);
      return newState;
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
