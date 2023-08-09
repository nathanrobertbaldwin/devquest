// ============================== IMPORTS ============================== //

import { dataNormalizer } from "./utilities";

// =========================== ACTION STRINGS ============================ //

const GET_GAME_DATA = "game_data/GET";

// ============================== ACTIONS ============================== //

const getGameData = (data) => ({
  type: GET_GAME_DATA,
  data: data,
});

// ============================== THUNKS =============================== //

export const getGameDataThunk = () => async (dispatch) => {
  const response = await fetch("/api/gamedata/");

  if (response.ok) {
    const data = await response.json();
    dispatch(getGameData(data));
  }
};

// ============================== REDUCER ============================== //

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_GAME_DATA: {
      const allGameData = action.data;
      // build backend for game data mega thunk and then return there.
    //   const normalizedAllCategories = dataNormalizer(allCategories);
      return {
        ...state,
        ...allGameData,
      };
    }
    default: {
      return state;
    }
  }
}
