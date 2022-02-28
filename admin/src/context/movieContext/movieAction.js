export const getMoviesStart = () => ({
  type: "GETMOVIES_START",
});
export const getMoviesSuccess = (movies) => ({
  type: "GETMOVIES_SUCCESS",
  payload: movies,
});
export const getMoviesFailure = () => ({
  type: "GETMOVIES_FAILURE",
});

export const deleteMovieStart = () => ({
  type: "DELMOVIE_START",
});
export const deleteMovieSuccess = (id) => ({
  type: "DELMOVIE_SUCCESS",
  payload: id,
});
export const deleteMovieFailure = () => ({
  type: "DELMOVIE_FAILURE",
});

export const addMovieStart = () => ({
  type: "ADDMOVIE_START",
});
export const addMovieSuccess = (movie) => ({
  type: "ADDMOVIE_SUCCESS",
  payload: movie,
});
export const addMovieFailure = () => ({
  type: "ADDMOVIE_FAILURE",
});

export const updateMovieStart = () => ({
  type: "UPDATEMOVIE_START",
});
export const updateMovieSuccess = (movie) => ({
  type: "UPDATEMOVIE_SUCCESS",
  payload: movie,
});
export const updateMovieFailure = () => ({
  type: "UPDATEMOVIE_FAILURE",
});
