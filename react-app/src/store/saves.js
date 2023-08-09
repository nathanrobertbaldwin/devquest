// =========================== ACTION STRINGS ============================ //

const GET_USER_SAVES = "user_saves/GET";

// ============================== ACTIONS ============================== //

const getUserSaves = (data) => ({
  type: GET_USER_SAVES,
  data: data,
});

// ============================== THUNKS =============================== //

export const getUserSavesThunk = () => async (dispatch) => {
  const response = await fetch("/api/userdata/saves");

  if (response.ok) {
    const data = await response.json();
    dispatch(getUserSaves(data));
  }
};

// ============================== REDUCER ============================== //

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SAVES: {
      const userSaves = action.data;
      return [...state, ...userSaves];
    }
    default: {
      return state;
    }
  }
}
