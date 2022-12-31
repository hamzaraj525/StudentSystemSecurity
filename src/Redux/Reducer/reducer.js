const initialState = {
  parentCnic: "",
  tokenUser: "",
};
export const ParentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PARENT_CNIC":
      return {
        ...state,
        parentCnic: action.parentCnic,
      };
    case "ADD_USER_TOKEN":
      return {
        ...state,
        tokenUser: action.tokenUser,
      };
  }
  return state;
};
export default ParentReducer;
