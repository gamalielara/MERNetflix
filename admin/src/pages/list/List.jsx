import "./list.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ListContext } from "../../context/listContext/listContext";
import { delList, getList } from "../../context/listContext/listAPICalls";

export default function List() {
  const { list, dispatch } = useContext(ListContext);

  useEffect(() => {
    getList(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    delList(dispatch, id);
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
      <DataGrid
        rows={list}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
}
