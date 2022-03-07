import { useState } from "react";
import "./newlist.css";
import { getMovies } from "../../context/movieContext/movieAPICalls";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/movieContext";
import { ListContext } from "../../context/listContext/listContext";
import { useEffect } from "react";
import { createList } from "../../context/listContext/listAPICalls";
import { useHistory } from "react-router-dom";

export default function NewList() {
  const [list, setList] = useState(null);
  const { dispatch: dispatchList } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const history = useHistory();

  useEffect(() => {
    getMovies(dispatchMovie);
  }, []);

  const handleChange = (e) => {
    setList({ ...list, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(dispatchList, list);
    history.push("/lists");
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="form-left">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter Title Here"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="Genre"
              name="genre"
              onChange={handleChange}
            />
          </div>

          <div className="addProductItem">
            <label>Series or Film</label>

            <label htmlFor="film">
              <input
                type="radio"
                name="type"
                value="film"
                id="film"
                onClick={handleChange}
              />{" "}
              Film
            </label>

            <label htmlFor="series">
              <input
                type="radio"
                name="type"
                value="series"
                id="series"
                onClick={handleChange}
              />{" "}
              Series
            </label>
            {/* <div className="addProductItem">
            <label>Type</label>
            <select
              name="type"
              id="isSeries"
              value="series"
              onChange={handleChange}
            >
              <option value="series">Series</option>
              <option value="film">Film</option>
            </select> */}
          </div>
        </div>

        <div className="form-right">
          <div className="addProductItem">
            <label>Content (Movies)</label>
            <select
              multiple
              name="content"
              id="isSeries"
              onChange={handleSelect}
              style={{ height: "300px" }}
            >
              {movies.map((mov) => {
                return (
                  <option key={mov._id} value={mov._id}>
                    {mov.title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <button className="addProductButton" onClick={(e) => handleSubmit(e)}>
          Create
        </button>
      </form>
    </div>
  );
}
