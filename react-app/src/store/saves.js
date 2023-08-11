// =========================== ACTION STRINGS ============================ //

const GET_USER_SAVES = "user_saves/GET";
const GET_NEW_CHAR_SAVE = "new_character/SAVE";
const RESET_SAVE_DATA = "save_data/RESET";

// ============================== ACTIONS ============================== //

const getUserSaves = (data) => ({
  type: GET_USER_SAVES,
  data: data,
});

const getNewCharSave = (data) => ({
  type: GET_NEW_CHAR_SAVE,
  data: data,
});

const resetSaveData = () => ({
  type: RESET_SAVE_DATA,
  data: [],
});

// ============================== THUNKS =============================== //

export const getUserSavesThunk = () => async (dispatch) => {
  const response = await fetch("/api/userdata/saves");

  if (response.ok) {
    const data = await response.json();
    dispatch(getUserSaves(data));
  }
};

export const getNewCharSaveThunk = (data) => async (dispatch) => {
  dispatch(getNewCharSave(data));
};

export const resetSaveDataThunk = () => async (dispatch) => {
  dispatch(resetSaveData());
};

// ============================== REDUCER ============================== //

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SAVES: {
      const userSaves = action.data;
      return [...state, ...userSaves];
    }
    case RESET_SAVE_DATA: {
      const data = action.data;
      return [...data];
    }
    case GET_NEW_CHAR_SAVE: {
      const newSave = action.data;
      return [...state, ...newSave];
    }
    default: {
      return state;
    }
  }
}
