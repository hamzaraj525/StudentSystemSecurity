const initialState = {
  parentCnic: "",
};
export const ParentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PARENT_CNIC":
      return {
        ...state,
        parentCnic: action.parentCnic,
      };
  }
  return state;
};
export default ParentReducer;
