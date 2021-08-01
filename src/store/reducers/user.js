import update from "immutability-helper";

const initialState = {
  user: {
    first_name: "",
    last_name: "",
    email: "",
    usersList: [],
  },
};
const user = (state = initialState, action) => {
  switch (action.type) {
    case "set_user_data":
      try {
        return update(state, {
          ...state,
          user: { $set: { ...action.payload } },
        });
      } catch (e) {
        console.log("error: ", e.message);
        return update(state, {
          user: { token: { $set: null } },
        });
      }
    case "set_users_list":
      try {
        return update(state, {
          ...state,
          user: { usersList: { $set: action.payload } },
        });
      } catch (e) {
        console.log("error: ", e.message);
        return update(state, {
          user: { usersList: [] },
        });
      }
    case "update_user":
      try {
        return update(state, {
          ...state,
          user: { $set: { ...action.payload } },
        });
      } catch (e) {
        console.log("error: ", e.message);
        return update(state, {
          user: { usersList: [] },
        });
      }
    default:
      return state;
  }
};

export default user;
