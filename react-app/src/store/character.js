// =========================== ACTION STRINGS ============================ //

const GET_CHARACTER_DATA = "character_data/GET";

// ============================== ACTIONS ============================== //

const getUserSaves = (data) => ({
  type: GET_CHARACTER_DATA,
  data: data,
});

// ============================== THUNKS =============================== //

export const getCharacterDataThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/characters/${id}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getUserSaves(data));
  }
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
    default: {
      return state;
    }
  }
}
