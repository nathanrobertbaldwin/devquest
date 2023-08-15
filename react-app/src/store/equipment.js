// // =========================== ACTION STRINGS ============================ //

// const CREATE_NEW_EQUIPMENT = "new_equipment/CREATE";
// const EDIT_EQUIPMENT = "equipment/EDIT";

// // ============================== ACTIONS ============================== //

// const createNewEquipment = (data) => ({
//   type: CREATE_NEW_EQUIPMENT,
//   data: data,
// });

// const editEquipmentById = (id) => ({
//   type: EDIT_EQUIPMENT,
//   data: id,
// });

// // ============================== THUNKS =============================== //

// export const createNewEquipmentThunk = (data) => async (dispatch) => {
//   const response = await fetch("/api/equipment/", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });

//   if (response.ok) {
//     const data = await response.json();
//     console.log("FROM THUNK", data);
//     dispatch(createNewEquipment(data));
//   }
// };

// export const editEquipmentByIdThunk = (id, data) => async (dispatch) => {
//   const response = await fetch(`/api/equipment/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(editEquipmentById(data));
//   }
// };

// // ============================== REDUCER ============================== //

// const initialState = {};

// export default function reducer(state = initialState, action) {
//   switch (action.type) {
//     case GET_GAME_DATA: {
//       const allGameData = action.data;
//       return {
//         ...state,
//         ...allGameData,
//       };
//     }
//     case ERASE_USER_DATA: {
//       const userdata = action.data;
//       return {
//         ...userdata,
//       };
//     }

//     default: {
//       return state;
//     }
//   }
// }
