// =========================== ACTION STRINGS ============================ //

const GET_USER_SAVES = "user_saves/GET";
const CREATE_USER_SAVES = "user_SAVES/CREATE";
const GET_NEW_CHAR_SAVE = "new_character/SAVE";
const DELETE_SAVE_FILE = "save_file/DELETE";

// ============================== ACTIONS ============================== //

const getUserSaves = (data) => ({
  type: GET_USER_SAVES,
  data: data,
});

const createUserSaves = (data) => ({
  type: CREATE_USER_SAVES,
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

// ============================== THUNKS =============================== //

export const getUserSavesThunk = () => async (dispatch) => {
  const response = await fetch("/api/userdata/saves");

  if (response.ok) {
    const data = await response.json();
    dispatch(getUserSaves(data));
  }
};

export const createUserSavesThunk = () => async (dispatch) => {
  const response = await fetch("/api/userdata/saves", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createUserSaves(data));
  }
};

export const deleteSaveFileThunk = (charId) => async (dispatch) => {
  const response = await fetch(`/api/userdata/saves/${charId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getUserSaves(data));
  }
};

// ============================== REDUCER ============================== //

const initialState = { 1: {}, 2: {}, 3: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SAVES: {
      const newState = { ...state };
      const userSaves = action.data;
      return { ...newState, ...userSaves };
    }
    case CREATE_USER_SAVES: {
      const userSaves = action.data;
      return { ...userSaves };
    }
    case GET_NEW_CHAR_SAVE: {
      const newState = { ...state };
      const newSave = action.data;
      return { ...newState, ...newSave };
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
