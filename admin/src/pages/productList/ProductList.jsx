import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../context/movieContext/movieContext";
import { delMovies, getMovies } from "../../context/movieContext/movieAPICalls";

export default function ProductList() {
  const { movies, dispatch, isFetching } = useContext(MovieContext);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    getMovies(dispatch);
  }, [refresh]);

  const handleDelete = (id) => {
    delMovies(dispatch, id);
    setRefresh((prev) => prev + 1);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={params.row.imgThumbnail}
              alt={params.row.title}
            />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 200 },
    { field: "year", headerName: "Year", width: 200 },
    { field: "limit", headerName: "limit", width: 200 },
    { field: "isSeries", headerName: "Series", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/movie/" + params.row._id, movie: params.row }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      {movies ? (
        <>
          <Link to="/newproduct">
            <button
              className="productAddButton"
              style={{ marginBottom: "10px" }}
            >
              Create Movie or Series
            </button>
          </Link>
          <DataGrid
            rows={movies}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
            getRowId={(row) => row._id}
          />
        </>
      ) : (
        <div className="loading">
          <h2>Loading ...</h2>
        </div>
      )}
    </div>
  );
}
