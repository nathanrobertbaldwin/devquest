// =========================== ACTION STRINGS ============================ //

const GET_CHARACTER_DATA = "character_data/GET";
const RESET_CHARACTER_DATA = "character_data/reset";

// ============================== ACTIONS ============================== //

const getUserSaves = (data) => ({
  type: GET_CHARACTER_DATA,
  data: data,
});

const resetCharacterData = () => ({
  type: RESET_CHARACTER_DATA,
  data: {},
});

// ============================== THUNKS =============================== //

export const getCharacterDataThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/characters/${id}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getUserSaves(data));
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
      const characterData = action.data;
      return {
        ...state,
        ...characterData,
      };
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
