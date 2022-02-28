import { useReducer } from "react";
import { createContext } from "react";
import listReducer from "./listReducer";

const INITITAL_STATE = {
  list: [],
  isFetching: false,
  error: false,
};

export const ListContext = createContext(INITITAL_STATE);

export const ListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(listReducer, INITITAL_STATE);

  return (
    <ListContext.Provider
      value={{
        list: state.list,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
