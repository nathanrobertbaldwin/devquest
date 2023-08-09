// =========================== ACTION STRINGS ============================ //

const GET_GAME_DATA = "game_data/GET";
const ERASE_USER_DATA = "game_data/ERASE";

// ============================== ACTIONS ============================== //

const getGameData = (data) => ({
  type: GET_GAME_DATA,
  data: data,
});

const eraseUserData = (data = {}) => ({
  type: ERASE_USER_DATA,
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

export const eraseUserDataThunk = () => async (dispatch) => {
  dispatch(eraseUserData());
};

// ============================== REDUCER ============================== //

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_GAME_DATA: {
      const allGameData = action.data;
      return {
        ...state,
        ...allGameData,
      };
    }
    case ERASE_USER_DATA: {
      const userdata = action.data;
      return {
        ...userdata,
      };
    }

    default: {
      return state;
    }
  }
}
