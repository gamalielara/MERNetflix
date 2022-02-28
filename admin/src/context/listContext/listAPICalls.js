import axios from "axios";
import {
  createListsFailure,
  createListsStart,
  createListsSuccess,
  delListsFailure,
  delListsStart,
  delListsSuccess,
  getListsFailure,
  getListsStart,
  getListsSuccess,
} from "./listAction";

export const getList = async (dispatch) => {
  dispatch(getListsStart());
  try {
    const res = await axios.get("/lists", {
      headers: {
        token: "Test " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getListsSuccess(res.data));
  } catch (err) {
    dispatch(getListsFailure());
  }
};

export const delList = async (dispatch, id) => {
  dispatch(delListsStart());
  try {
    await axios.delete("/lists/", {
      params: {
        id,
      },
      headers: {
        token: "Test " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(delListsSuccess(id));
  } catch (err) {
    dispatch(delListsFailure());
  }
};

export const createList = async (dispatch, list) => {
  dispatch(createListsStart());
  try {
    const res = await axios.post("/lists/", list, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createListsSuccess(res.data));
  } catch (err) {
    dispatch(createListsFailure());
  }
};

/*
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
 */
