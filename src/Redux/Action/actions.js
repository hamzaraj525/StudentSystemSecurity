export const addParentCnic = (parentCnic) => {
  console.log("parentCnic", parentCnic);
  return {
    type: "ADD_PARENT_CNIC",
    parentCnic: parentCnic,
  };
};
export const addExpoToken = (tokenUser) => {
  console.log("tokenUser--Redux---", tokenUser);
  return {
    type: "ADD_USER_TOKEN",
    tokenUser: tokenUser,
  };
};
