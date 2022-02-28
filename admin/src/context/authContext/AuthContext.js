/*
INITIAL STATE : contains the information of the user, if it's fetching any datafrom the API or not,
(if we click the login button, it's gonna be true)
*/
import AuthReducer from "./AuthReducer";
import { createContext, useReducer } from "react";
import { useEffect } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  // dispatch is used when we do action like login, succes, or failure
  // state is the data fetched from AuthReducer (AuthReducer return the INITIAL_STATE that has been modified)
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
