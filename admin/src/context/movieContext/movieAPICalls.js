import axios from "axios";
import {
  addMovieFailure,
  addMovieStart,
  addMovieSuccess,
  deleteMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
  updateMovieFailure,
  updateMovieStart,
  updateMovieSuccess,
} from "./movieAction";

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await axios.get("/movies/allmovies", {
      headers: {
        token: "Test " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getMoviesSuccess(res.data));
  } catch (err) {
    dispatch(getMoviesFailure());
  }
};

export const delMovies = async (dispatch, id) => {
  dispatch(deleteMovieStart());
  try {
    await axios.delete(`/movies/${id}`, {
      headers: {
        token: "Test " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteMovieSuccess(id));
  } catch (err) {
    dispatch(deleteMovieFailure());
  }
};

export const addMovies = async (dispatch, movie) => {
  dispatch(addMovieStart());
  try {
    const res = await axios.post("/movies", movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(addMovieSuccess(res.data));
  } catch (err) {
    dispatch(addMovieFailure());
  }
};

export const updateMovie = async (dispatch, movie) => {
  dispatch(updateMovieStart());
  try {
    const res = await axios.put(`/movies/${movie._id}`, movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateMovieSuccess(res.data));
  } catch (err) {
    dispatch(updateMovieFailure());
  }
};
