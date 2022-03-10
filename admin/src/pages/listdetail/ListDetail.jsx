import { useContext, useEffect, useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { updateList } from "../../context/listContext/listAPICalls";
import { ListContext } from "../../context/listContext/listContext";
import { getMovies } from "../../context/movieContext/movieAPICalls";
import { MovieContext } from "../../context/movieContext/movieContext";
import "./listdetail.css";

export default function ListDetail() {
  const location = useLocation();
  const list = location.list;
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const { dispatch: dispatchList } = useContext(ListContext);
  let selectedMovies = [];
  const [listToUpdate, setListToUpdate] = useState({
    _id: list._id,
    content: [],
  });
  const history = useHistory();
  const noimage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM-TamDSf7UAM-7B_Gg2xh9lIcDp6jzPwfI7jJEYWEmkGCLy1mo7eNE0AUoH5neDHRt7A&usqp=CAU";

  useEffect(() => {
    getMovies(dispatchMovie);
  }, []);

  const getMovieImage = (id) => {
    let img = null;
    movies.forEach((mov) => {
      if (mov._id === id) {
        img = mov.imgThumbnail;
      }
    });
    return img;
  };

  const handleSelect = (e) => {
    if (e.target.checked) {
      setListToUpdate({
        ...listToUpdate,
        content: [...listToUpdate.content, e.target.value],
      });
    } else {
      setListToUpdate({
        ...listToUpdate,
        content: [listToUpdate.content.filter((li) => li !== e.target.value)],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listToUpdate.content === []) {
      setListToUpdate({ ...listToUpdate, content: list.content });
    }
    updateList(dispatchList, listToUpdate);
    history.push("/lists");
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List Info</h1>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="productMiddle">
        <h3>List Contents</h3>
        <div className="list-detail">
          {list.content.map((mov) => {
            return <img src={getMovieImage(mov) || noimage} alt="" />;
          })}
        </div>
      </div>

      <div className="productBottom">
        <div className="details">
          <h3>Edit List Details</h3>
          <form
            className="productForm"
            style={{ width: "90%", margin: "0 auto" }}
          >
            <div className="productFormLeft">
              <label>List Title</label>
              <input
                type="text"
                placeholder={list.title}
                name="title"
                onChange={(e) =>
                  setListToUpdate({
                    ...listToUpdate,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <label>Type</label>
              <input
                type="text"
                placeholder={list.type}
                name="type"
                onChange={(e) =>
                  setListToUpdate({
                    ...listToUpdate,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <label>Genre</label>
              <input
                type="text"
                placeholder={list.genre}
                name="genre"
                onChange={(e) =>
                  setListToUpdate({
                    ...listToUpdate,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="details" style={{ marginTop: "50px" }}>
              <h3>Select Movies to Edit</h3>
              <div className="moviesLists">
                {movies.map((mov, i) => {
                  const title = mov.title;
                  const id = mov._id;
                  return (
                    <label htmlFor={i} className="movieLabel">
                      <input
                        type="checkbox"
                        name="content"
                        id={i}
                        key={i}
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
              <button className="productButton" onClick={handleSubmit}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
