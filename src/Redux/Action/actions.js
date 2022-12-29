export const addParentCnic = (parentCnic) => {
  console.log("parentCnic", parentCnic);
  return {
    type: "ADD_PARENT_CNIC",
    parentCnic: parentCnic,
  };
};
