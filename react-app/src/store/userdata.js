// =========================== ACTION STRINGS ============================ //

const GET_USER_DATA = "user_data/GET";

// ============================== ACTIONS ============================== //

const getUserData = (data) => ({
  type: GET_USER_DATA,
  data: data,
});

// ============================== THUNKS =============================== //

export const getUserDataThunk = () => async (dispatch) => {
  const response = await fetch("/api/userdata/");

  if (response.ok) {
    const data = await response.json();
    dispatch(getUserData(data));
  }
};

// ============================== REDUCER ============================== //

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DATA: {
      const allUserData = action.data;
      return {
        ...state,
        ...allUserData,
      };
    }
    default: {
      return state;
    }
  }
}
