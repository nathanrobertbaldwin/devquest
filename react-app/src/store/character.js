// ============================== IMPORTS ================================ //

import { flattenInventory, flattenItem } from "./utilities";
import { deleteSaveFile, getNewCharSave } from "./saves";

// =========================== ACTION STRINGS ============================ //

const GET_CHARACTER_DATA = "character_data/GET";
const CREATE_NEW_CHARACTER = "character_data/POST";
const TOGGLE_INVENTORY_ITEM_EQUIP = "inventory_item_equip/TOGGLE";
const ADD_INVENTORY_ITEM = "inventory_item/DROP";
const DROP_INVENTORY_ITEM = "inventory_item/DROP";
const UPDATE_CHARACTER_ENERGY = "character_energy/UPDATE";
const UPDATE_CHARACTER_SANITY = "character_sanity/UPDATE";
const UPDATE_CHARACTER_STAGE = "character_stage/UPDATE";
const EDIT_CHARACTER_STATS = "character_stats/EDIT";
const DELETE_CHARACTER = "character/DELETE";

// ============================== ACTIONS ============================== //

const getCharacterData = (data) => ({
  type: GET_CHARACTER_DATA,
  data: data,
});

const createNewCharacter = (newCharacter) => ({
  type: CREATE_NEW_CHARACTER,
  data: newCharacter,
});

const toggleInventoryItemEquip = (itemId) => ({
  type: TOGGLE_INVENTORY_ITEM_EQUIP,
  data: itemId,
});

const addInventoryItem = (itemId) => ({
  type: ADD_INVENTORY_ITEM,
  data: itemId,
});

const dropInventoryItem = (itemId) => ({
  type: DROP_INVENTORY_ITEM,
  data: itemId,
});

const updateCharacterEnergy = (change) => ({
  type: UPDATE_CHARACTER_ENERGY,
  data: change,
});

const udpateCharacterSanity = (change) => ({
  type: UPDATE_CHARACTER_SANITY,
  data: change,
});

const udpateCharacterStage = (change) => ({
  type: UPDATE_CHARACTER_STAGE,
  data: change,
});

const editCharacterStats = (updates) => ({
  type: EDIT_CHARACTER_STATS,
  data: updates,
});

const deleteCharacter = () => ({
  type: DELETE_CHARACTER,
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
    dispatch(toggleInventoryItemEquip(itemId));
  }
};

export const addInventoryItemThunk = (charId, itemId) => async (dispatch) => {
  const response = await fetch(`/api/characters/inventory/${itemId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ char_id: charId }),
  });

  if (response.ok) {
    const data = await response.json();
    const newInventoryItem = flattenItem(data);
    dispatch(addInventoryItem(newInventoryItem));
  }
};

export const dropInventoryItemThunk = (itemId) => async (dispatch) => {
  const response = await fetch(`/api/characters/inventory/${itemId}/drop`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    dispatch(dropInventoryItem(itemId));
  }
};

export const updateCharacterEnergyThunk =
  (charId, change) => async (dispatch) => {
    const response = await fetch(`/api/characters/${charId}/energy`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ change }),
    });
    if (response.ok) {
      dispatch(updateCharacterEnergy(change));
    }
  };

export const udpateCharacterSanityThunk =
  (charId, change) => async (dispatch) => {
    const response = await fetch(`/api/characters/${charId}/sanity`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ change }),
    });
    if (response.ok) {
      dispatch(udpateCharacterSanity(change));
    }
  };

export const udpateCharacterStageThunk =
  (charId, change) => async (dispatch) => {
    const response = await fetch(`/api/characters/${charId}/stage`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ change }),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(udpateCharacterStage(data.stage));
      return data.stage;
    }
  };

export const editCharacterStatsThunk =
  (charId, updates) => async (dispatch) => {
    const response = await fetch(`/api/characters/${charId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(editCharacterStats(data));
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

// ============================== REDUCER ============================== //

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHARACTER_DATA: {
      const newState = { ...state };
      const character = action.data;
      return { ...newState, ...character };
    }
    case CREATE_NEW_CHARACTER: {
      const newState = { ...state };
      const character = action.data;
      return { ...newState, ...character };
    }
    case TOGGLE_INVENTORY_ITEM_EQUIP: {
      const newState = { ...state };
      const itemId = action.data;
      newState.inventory[itemId].equipped =
        !newState.inventory[itemId].equipped;
      return newState;
    }
    case ADD_INVENTORY_ITEM: {
      const newState = { ...state };
      const newInventoryItem = action.data;
      const idx = newInventoryItem.id;
      newState.inventory[idx] = newInventoryItem;
      return newState;
    }
    case DROP_INVENTORY_ITEM: {
      const newState = { ...state };
      const itemId = action.data;
      delete newState.inventory[itemId];
      return newState;
    }
    case UPDATE_CHARACTER_ENERGY: {
      const newState = { ...state };
      const change = action.data;
      if (change > 0) {
        newState.currEnergy = Math.max(0, newState.currEnergy - change);
      } else {
        newState.currEnergy = Math.min(
          newState.maxEnergy,
          newState.currEnergy - change
        );
      }
      return newState;
    }
    case UPDATE_CHARACTER_SANITY: {
      const newState = { ...state };
      const change = action.data;
      if (change > 0) {
        newState.currSanity = Math.max(0, newState.currSanity - change);
      } else {
        newState.currSanity = Math.min(
          newState.maxSanity,
          newState.currSanity - change
        );
      }
      return newState;
    }
    case UPDATE_CHARACTER_STAGE: {
      const newState = { ...state };
      newState.stage = action.data;
      return { ...newState };
    }
    case EDIT_CHARACTER_STATS: {
      const newState = { ...state };
      const statUpdates = action.data;
      return { ...newState, ...statUpdates };
    }
    case DELETE_CHARACTER: {
      const data = action.data;
      return { ...data };
    }
    default: {
      return state;
    }
  }
}
