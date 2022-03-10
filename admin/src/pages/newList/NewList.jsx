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
  let selectedMovie = [];

  useEffect(() => {
    getMovies(dispatchMovie);
  }, []);

  const handleChange = (e) => {
    setList({ ...list, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setList({ ...list, content: selectedMovie });
    createList(dispatchList, list);
    history.push("/lists");
  };

  const handleSelect = (e) => {
    if (e.target.checked) {
      selectedMovie.push(e.target.value);
    } else {
      selectedMovie = selectedMovie.filter((mov) => {
        return mov !== e.target.value;
      });
    }
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
          </div>
        </div>

        <div className="form-right">
          <div className="addProductItem">
            <label>Select Movies</label>
            <div className="moviesLists">
              {movies.map((mov, i) => {
                const title = mov.title;
                const id = mov._id;
                return (
                  <label htmlFor={i} className="movieLabel" key={i}>
                    <input
                      type="checkbox"
                      name={title}
                      id={i}
                      value={id}
                      onChange={handleSelect}
                    />{" "}
                    <img
                      src={mov.imgFull}
                      alt={title}
                      className="productImage"
                    />
                    {title}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
        <button className="addProductButton" onClick={(e) => handleSubmit(e)}>
          Create
        </button>
      </form>
    </div>
  );
}
