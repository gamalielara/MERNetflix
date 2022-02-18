// three stages : starting stage, success stage and failure stage
export const loginStart = () => ({
  type: "LOGIN_START",
});

// if success, return user
export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFailure = () => ({
  type: "LOGIN_FAILURE",
});
