export const getListsStart = () => ({
  type: "GETLISTS_START",
});

export const getListsSuccess = (lists) => ({
  type: "GETLISTS_SUCCESS",
  payload: lists,
});

export const getListsFailure = () => ({
  type: "GETLISTS_FAILURE",
});

export const delListsStart = () => ({
  type: "DELLISTS_START",
});

export const delListsSuccess = (id) => ({
  type: "DELLISTS_SUCCESS",
  payload: id,
});

export const delListsFailure = () => ({
  type: "DELLISTS_FAILURE",
});

export const createListsStart = () => ({
  type: "CREATELISTS_START",
});

export const createListsSuccess = (id) => ({
  type: "CREATELISTS_SUCCESS",
  payload: id,
});

export const createListsFailure = () => ({
  type: "CREATELISTS_FAILURE",
});
export const updateListsStart = () => ({
  type: "UPDATELISTS_START",
});

export const updateListsSuccess = (list) => ({
  type: "UPDATELISTS_SUCCESS",
  payload: list,
});

export const updateListsFailure = () => ({
  type: "UPDATELISTS_FAILURE",
});
