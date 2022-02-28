import { Link, Redirect, useLocation } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";
import { updateMovie } from "../../context/movieContext/movieAPICalls";
import { useState } from "react";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/movieContext";

export default function Product() {
  const location = useLocation();
  const movie = location.movie;
  const [mov, setMov] = useState({});

  const { dispatch } = useContext(MovieContext);

  const updateMovie = (e) => {
    e.preventDefault();
    updateMovie(dispatch, mov);
  };

  return movie ? (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie Info</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              src={movie.imgFull}
              alt={movie.title}
              className="productInfoImg"
            />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input
              type="text"
              placeholder={movie.title}
              onChange={(e) => {
                setMov({ ...mov, title: e.target.value });
              }}
            />
            <label>Year</label>
            <input
              type="text"
              placeholder={movie.year}
              onChange={(e) => {
                setMov({ ...mov, year: e.target.value });
              }}
            />
            <label>Genre</label>
            <input
              type="text"
              placeholder={movie.genre}
              onChange={(e) => {
                setMov({ ...mov, genre: e.target.value });
              }}
            />
            <label>Limit</label>
            <input
              type="text"
              placeholder={movie.limit}
              onChange={(e) => {
                setMov({ ...mov, limit: e.target.value });
              }}
            />
            <label>Year</label>
            <input
              type="text"
              placeholder={movie.year}
              onChange={(e) => {
                setMov({ ...mov, year: e.target.value });
              }}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={movie.imgFull} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  setMov({ ...mov, imgFull: e.target.files[0] });
                }}
              />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Redirect to="/movies" />
  );
}
