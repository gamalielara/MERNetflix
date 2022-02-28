const movieReducer = (state, action) => {
  switch (action.type) {
    case "GETMOVIES_START":
      return {
        movies: [],
        isFetching: true,
        error: false,
      };
    case "GETMOVIES_SUCCESS":
      return {
        movies: action.payload,
        isFetching: false,
        error: false,
      };
    case "GETMOVIES_FAILURE":
      return {
        movies: [],
        isFetching: false,
        error: true,
      };
    case "DELMOVIE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELMOVIE_SUCCESS":
      return {
        movies: state.movies.filter((movie) => movie.id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELMOVIE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "ADDMOVIES_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "ADDMOVIES_SUCCESS":
      return {
        movies: [...state.movies, action.payload],
        isFetching: false,
        error: false,
      };
    case "ADDMOVIES_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPDATEMOVIES_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATEMOVIES_SUCCESS":
      return {
        movies: state.movies.map((mov) => {
          if (mov._id === action.payload._id) {
            return action.payload;
          }
          return mov;
        }),
        isFetching: false,
        error: false,
      };
    case "UPDATEMOVIES_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default movieReducer;
