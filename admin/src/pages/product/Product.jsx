import { Redirect, useHistory, useLocation } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";
import { updateMovie } from "../../context/movieContext/movieAPICalls";
import { useState } from "react";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/movieContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../firebase";

export default function Product() {
  const location = useLocation();
  const movie = location.movie;
  const [mov, setMov] = useState({ _id: movie._id });
  const history = useHistory();
  const { dispatch } = useContext(MovieContext);
  const noimage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM-TamDSf7UAM-7B_Gg2xh9lIcDp6jzPwfI7jJEYWEmkGCLy1mo7eNE0AUoH5neDHRt7A&usqp=CAU";

  const updateMovieHandler = (e) => {
    e.preventDefault();
    updateMovie(dispatch, mov);
    history.push("/movies");
  };

  const uploadMoviePicture = (e, filedesc) => {
    e.preventDefault();
    console.log(filedesc.type);
    const fileImg = e.target.files[0];
    const fileName = new Date(0).getTime() + "_imgFull_" + fileImg.name;
    const storageRef = ref(storage, `/items/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, fileImg);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },

      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) =>
          setMov((prev) => {
            return { ...prev, [filedesc.type]: url };
          })
        );
      }
    );
  };

  return movie ? (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie Info</h1>
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
            <label>Series or Movie</label>
            <label htmlFor="film">
              <input
                type="radio"
                name="isSeries"
                value="false"
                id="film"
                onClick={(e) => setMov({ ...mov, isSeries: e.target.value })}
              />{" "}
              Film
            </label>
            <label htmlFor="series">
              <input
                type="radio"
                name="isSeries"
                value="true"
                id="series"
                onClick={(e) => setMov({ ...mov, isSeries: e.target.value })}
              />{" "}
              Series
            </label>
          </div>
          <div className="productFormRight">
            <div className="productUpload" style={{ marginBottom: "10px" }}>
              <div className="feature-img">
                <h3>Full Image</h3>
                <img
                  src={movie.imgFull ? movie.imgFull : noimage}
                  alt=""
                  className="productUploadImg"
                  style={{ maxWidth: "500px" }}
                />
              </div>
              <label for="imgFullUploader">
                <Publish />
              </label>
              <input
                type="file"
                id="imgFullUploader"
                style={{ display: "none" }}
                onChange={(e) => {
                  uploadMoviePicture(e, { type: "imgFull" });
                }}
              />
            </div>

            <div className="productUpload" style={{ marginBottom: "10px" }}>
              <div className="feature-img">
                <h3>Thumbnail Image</h3>
                <img
                  src={movie.imgThumbnail ? movie.imgThumbnail : noimage}
                  alt=""
                  className="productUploadImg"
                  style={{ maxWidth: "500px" }}
                />
              </div>
              <label for="imgThumbnailUploader">
                <Publish />
              </label>
              <input
                type="file"
                id="imgThumbnailUploader"
                style={{ display: "none" }}
                onChange={(e) => {
                  uploadMoviePicture(e, { type: "imgThumbnail" });
                }}
              />
            </div>

            <div className="productUpload" style={{ marginBottom: "10px" }}>
              <div className="feature-img">
                <h3>Title Image</h3>
                <img
                  src={movie.imgTitle ? movie.imgTitle : noimage}
                  alt=""
                  className="productUploadImg img-title-preview"
                  style={{ maxWidth: "500px" }}
                />
              </div>
              <label for="imgTitleUploader">
                <Publish />
              </label>
              <input
                type="file"
                id="imgTitleUploader"
                style={{ display: "none" }}
                onChange={(e) => {
                  uploadMoviePicture(e, { type: "imgTitle" });
                }}
              />
            </div>

            <div className="productUpload" style={{ marginBottom: "10px" }}>
              <div className="feature-img">
                <h3>Preview Image</h3>
                <img
                  src={movie.imgPreview ? movie.imgPreview : noimage}
                  alt=""
                  className="productUploadImg"
                  style={{
                    maxWidth: "500px",
                    objectFit: "contain",
                    backgroundColor: "black",
                  }}
                />
              </div>
              <label for="imgPreviewUploader">
                <Publish />
              </label>
              <input
                type="file"
                id="imgPreviewUploader"
                style={{ display: "none" }}
                onChange={(e) => {
                  uploadMoviePicture(e, { type: "imgPreview" });
                }}
              />
            </div>

            <div className="productUpload" style={{ marginBottom: "10px" }}>
              <div className="feature-img">
                <h3>Mobile Image</h3>
                <img
                  src={movie.imgMobile ? movie.imgMobile : noimage}
                  alt=""
                  className="productUploadImg"
                  style={{ maxWidth: "500px" }}
                />
              </div>
              <label for="imgMobileUploader">
                <Publish />
              </label>
              <input
                type="file"
                id="imgMobileUploader"
                style={{ display: "none" }}
                onChange={(e) => {
                  uploadMoviePicture(e, { type: "imgMobile" });
                }}
              />
            </div>

            <button
              className="productButton"
              onClick={(e) => updateMovieHandler(e)}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Redirect to="/movies" />
  );
}
