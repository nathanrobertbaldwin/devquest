// =========================== ACTION STRINGS ============================ //

const GET_GAME_DATA = "game_data/GET";
const CREATE_NEW_EQUIPMENT = "new_equipment/CREATE";
const EDIT_EQUIPMENT = "equipment/EDIT";
const CREATE_MEW_MONSTER_TEMPLATE = "monster_template/CREATE";
const EDIT_MONSTER_TEMPLATE = "monster_template/EDIT";
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

export const createMonsterTemplate = (data) => ({
  type: CREATE_MEW_MONSTER_TEMPLATE,
  data: data,
});

export const editMonsterTemplate = (data) => ({
  type: EDIT_MONSTER_TEMPLATE,
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

export const createNewEquipmentThunk = (data) => async (dispatch) => {
  const response = await fetch("/api/equipment/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const newEquipment = await response.json();
    dispatch(createNewEquipment(newEquipment));
  }
};

export const createNewMonsterTemplateThunk = (data) => async (dispatch) => {
  const response = await fetch("/api/monstertemplates/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const newMonsterTemplate = await response.json();
    dispatch(createMonsterTemplate(newMonsterTemplate));
  }
};

export const editEquipmentByIdThunk = (id, data) => async (dispatch) => {
  const response = await fetch(`/api/equipment/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const editedEquipment = await response.json();
    dispatch(editEquipmentById(editedEquipment));
  }
};

export const editMonsterTemplateByIdThunk = (id, data) => async (dispatch) => {
  const response = await fetch(`/api/monstertemplates/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const editedMonster = await response.json();
    dispatch(editMonsterTemplate(editedMonster));
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
      const newState = { ...state };
      const newEquipment = action.data;
      const id = newEquipment.id;
      newState.equipment[id] = newEquipment;
      newState.equipmentArr.push(newEquipment);
      return newState;
    }
    case CREATE_MEW_MONSTER_TEMPLATE: {
      const newState = { ...state };
      const newMonsterTemplate = action.data;
      const id = newMonsterTemplate.id;
      newState.monsterTemplates[id] = newMonsterTemplate;
      newState.monsterTemplatesArr.push(newMonsterTemplate);
      return newState;
    }
    case EDIT_EQUIPMENT: {
      const newState = { ...state };
      const newEquipment = action.data;
      const id = newEquipment.id;
      newState.equipment[id] = newEquipment;
      newState.equipmentArr = Object.values(newState.equipment);
      return newState;
    }
    case EDIT_MONSTER_TEMPLATE: {
      const newState = { ...state };
      const editedMonster = action.data;
      console.log("FROM STORE", editedMonster);
      const id = editedMonster.id;
      newState.monsterTemplates[id] = editedMonster;
      newState.monsterTemplatesArr = Object.values(newState.monsterTemplates);
      return newState;
    }

    default: {
      return state;
    }
  }
}
