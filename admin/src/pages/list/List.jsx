import "./list.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "../../context/listContext/listContext";
import { delList, getList } from "../../context/listContext/listAPICalls";

export default function List() {
  const { list, dispatch, isFetching } = useContext(ListContext);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    getList(dispatch);
  }, [refresh]);

  const handleDelete = (id) => {
    delList(dispatch, id);
    setRefresh((prev) => prev + 1);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "genre", headerName: "Genre", width: 200 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "type", headerName: "Type", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/list/" + params.row._id, list: params.row }}
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
      {list ? (
        <>
          <Link to="/newlist">
            <button
              className="productAddButton"
              style={{ marginBottom: "10px" }}
            >
              Create New List
            </button>
          </Link>
          <DataGrid
            rows={list}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
            getRowId={(row) => row._id}
          />
        </>
      ) : isFetching ? (
        <h1>Fetching ...</h1>
      ) : (
        <h1>No list here. Add some list</h1>
      )}
    </div>
  );
}
