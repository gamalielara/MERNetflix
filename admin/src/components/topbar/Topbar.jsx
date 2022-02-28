import React from "react";
import "./topbar.css";
import { NotificationsNone, Settings } from "@material-ui/icons";
import { logout } from "../../context/authContext/AuthAction";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useContext } from "react";

export default function Topbar() {
  const { dispatch } = useContext(AuthContext);
  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">MERNetflix Admin Dashboard</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer" onClick={handleLogOut}>
            Log Out
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
