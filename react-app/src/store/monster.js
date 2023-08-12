// =========================== ACTION STRINGS ============================ //

const CREATE_NEW_MONSTER = "new_monster/CREATE";
const UPDATE_MONSTER_HP = "monster_hp/UPDATE";
// const DELETE_MONSTER = "monster/DELETE";

// ============================== ACTIONS ============================== //

export const createNewMonster = (data) => ({
  type: CREATE_NEW_MONSTER,
  data: data,
});

export const updateMonsterHP = (data) => ({
  type: UPDATE_MONSTER_HP,
  data: data,
});

// ============================== THUNKS =============================== //

export const createNewMonsterThunk = (data) => async (dispatch) => {
  dispatch(createNewMonster(data));
};

export const updateMonsterHpThunk = (data) => async (dispatch) => {
  dispatch(updateMonsterHP(data));
};

// ============================== REDUCER ============================== //

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_NEW_MONSTER: {
      const monster = action.data;
      return { ...monster };
    }
    case UPDATE_MONSTER_HP: {
      const damage = action.data;
      const newState = { ...state };
      newState.currHp -= damage;
      return { ...newState };
    }
    default: {
      return state;
    }
  }
}
