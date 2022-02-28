import { useReducer, createContext } from "react";
import movieReducer from "./movieReducer";

const INITIAL_STATE_MOVIE = {
  movies: [],
  isFetching: false,
  error: false,
};

export const MovieContext = createContext(INITIAL_STATE_MOVIE);

export const MovieContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, INITIAL_STATE_MOVIE);

  return (
    <MovieContext.Provider
      value={{
        movies: state.movies,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
