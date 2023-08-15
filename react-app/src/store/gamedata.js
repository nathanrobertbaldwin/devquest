// =========================== ACTION STRINGS ============================ //

const GET_GAME_DATA = "game_data/GET";
const CREATE_NEW_EQUIPMENT = "new_equipment/CREATE";
const EDIT_EQUIPMENT = "equipment/EDIT";
const ERASE_USER_DATA = "game_data/ERASE";

// ============================== ACTIONS ============================== //

const getGameData = (data) => ({
  type: GET_GAME_DATA,
  data: data,
});

const createNewEquipment = (data) => ({
  type: CREATE_NEW_EQUIPMENT,
  data: data,
});

const editEquipmentById = (id) => ({
  type: EDIT_EQUIPMENT,
  data: id,
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

export const createNewEquipmentThunk = (data) => async (dispatch) => {
  const response = await fetch("/api/equipment/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createNewEquipment(data));
  }
};

export const editEquipmentByIdThunk = (id, data) => async (dispatch) => {
  const response = await fetch(`/api/equipment/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(editEquipmentById(data));
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
    case CREATE_NEW_EQUIPMENT: {
      // const newEquipment = action.data;
      // const newState = state.equipment
    }

    default: {
      return state;
    }
  }
}
