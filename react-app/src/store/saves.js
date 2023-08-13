// =========================== ACTION STRINGS ============================ //

const GET_USER_SAVES = "user_saves/GET";
const GET_NEW_CHAR_SAVE = "new_character/SAVE";
const DELETE_SAVE_FILE = "save_file/DELETE";
const RESET_SAVE_DATA = "save_data/RESET";

// ============================== ACTIONS ============================== //

const getUserSaves = (data) => ({
  type: GET_USER_SAVES,
  data: data,
});

export const getNewCharSave = (data) => ({
  type: GET_NEW_CHAR_SAVE,
  data: data,
});

export const deleteSaveFile = (save_slot) => ({
  type: DELETE_SAVE_FILE,
  data: save_slot,
});

const resetSaveData = () => ({
  type: RESET_SAVE_DATA,
  data: {},
});

// ============================== THUNKS =============================== //

export const getUserSavesThunk = () => async (dispatch) => {
  const response = await fetch("/api/userdata/saves");

  if (response.ok) {
    const data = await response.json();
    dispatch(getUserSaves(data));
  }
};

export const deleteSaveFileThunk = (charId) => async (dispatch) => {
  const response = await fetch("/api/userdata/saves");

  if (response.ok) {
    const data = await response.json();
    dispatch(getUserSaves(data));
  }
};

export const resetSaveDataThunk = () => async (dispatch) => {
  dispatch(resetSaveData());
};

// ============================== REDUCER ============================== //

const initialState = { 1: {}, 2: {}, 3: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SAVES: {
      const userSaves = action.data;
      return { ...state, ...userSaves };
    }
    case RESET_SAVE_DATA: {
      const emptyData = action.data;
      return { ...emptyData };
    }
    case GET_NEW_CHAR_SAVE: {
      const newSave = action.data;
      return { ...state, ...newSave };
    }
    case DELETE_SAVE_FILE: {
      const id = action.data;
      const newState = { ...state };
      newState[id] = {};

      return { ...newState };
    }
    default: {
      return state;
    }
  }
}
