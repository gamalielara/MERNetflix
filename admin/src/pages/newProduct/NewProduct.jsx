import { useState } from "react";
import "./newProduct.css";
import storage from "../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { addMovies } from "../../context/movieContext/movieAPICalls";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/movieContext";
import { useHistory } from "react-router-dom";

export default function NewProduct() {
  const [movie, setMovie] = useState({});
  const [imgFull, setImgFull] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgThumbnail, setImgThumbnail] = useState(null);
  const [imgMobile, setImgMobile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const { dispatch } = useContext(MovieContext);
  const history = useHistory();
  const [isUploaded, setIsUploaded] = useState(false);

  const handleChange = (e) => {
    const val = e.target.value;
    setMovie({ ...movie, [e.target.name]: val });
  };

  const upload = (items) => {
    // to upload files to firebase
    items.forEach((item) => {
      const fileName =
        new Date().getTime() + "_" + item.label + "_" + item.file.name;
      const storageRef = ref(storage, `/items/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);
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
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            })
          );
        }
      );
      setUploaded((prev) => prev + 1);
      setIsUploaded((prev) => !prev);
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: imgFull, label: "imgFull" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgThumbnail, label: "imgThumbnail" },
      { file: imgMobile, label: "imgMobile" },
      { file: imgPreview, label: "imgPreview" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovies(dispatch, movie);
    history.push("/movies");
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Full Image</label>
          <input
            type="file"
            id="imgFull"
            name="imgFull"
            onChange={(e) => setImgFull(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Thumbnail Image</label>
          <input
            type="file"
            id="imgThumbnail"
            name="imgThumbnail"
            onChange={(e) => setImgThumbnail(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Mobile Image</label>
          <input
            type="file"
            id="imgMobile"
            name="imgMobile"
            onChange={(e) => setImgMobile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Preview Image</label>
          <input
            type="file"
            id="imgPreview"
            name="imgPreview"
            onChange={(e) => setImgPreview(e.target.files[0])}
          />
        </div>
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
          <label>Description</label>
          <textarea
            name="description"
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year"
            name="year"
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
          <label>Headline Text</label>
          <input
            type="text"
            placeholder="Headline Text Here"
            name="headline"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Age Limit</label>
          <input
            type="text"
            placeholder="Age Limit"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Starring Actors</label>
          <input
            type="text"
            placeholder="Actors"
            name="actor"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Series or Film</label>

          <label htmlFor="film">
            <input
              type="radio"
              name="isSeries"
              value="false"
              id="film"
              onClick={handleChange}
            />{" "}
            Film
          </label>

          <label htmlFor="series">
            <input
              type="radio"
              name="isSeries"
              value="true"
              id="series"
              onClick={handleChange}
            />{" "}
            Series
          </label>
          {/* <select
            name="isSeries"
            id="isSeries"
            onChange={handleChange}
          >
            <option value="">Choose</option>
            <option value="true">Series</option>
            <option value="false">Film</option>
          </select> */}
        </div>
        {uploaded === 5 ? (
          isUploaded ? (
            <button
              className="addProductButton"
              onClick={(e) => handleSubmit(e)}
            >
              Create
            </button>
          ) : (
            <button className="loadingButton">Uploading</button>
          )
        ) : (
          <button className="addProductButton" onClick={(e) => handleUpload(e)}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
