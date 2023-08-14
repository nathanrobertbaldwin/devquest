// =========================== ACTION STRINGS ============================ //

const CREATE_NEW_MONSTER = "new_monster/CREATE";
const UPDATE_MONSTER_HP = "monster_hp/UPDATE";

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
  const response = await fetch("/api/monster/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const monster = await response.json();
    dispatch(createNewMonster(monster));
  }
};

export const updateMonsterHpThunk = (damage) => async (dispatch) => {
  const response = await fetch("/api/monster/", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ damage }),
  });

  if (response.ok) {
    dispatch(updateMonsterHP(damage));
  }
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
      newState.currHp = Math.max(0, newState.currHp - damage);
      return { ...newState };
    }
    default: {
      return state;
    }
  }
}
