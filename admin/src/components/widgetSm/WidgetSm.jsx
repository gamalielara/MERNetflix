import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function WidgetSm() {
  const [newUser, setNewUser] = useState([]);

  useEffect(() => {
    const getNewUser = async () => {
      try {
        const res = await axios.get("users?new=true", {
          headers: {
            token:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDBkMmVlODFmZjg0MmM0NzZkNTYwZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NTAwNDU3MywiZXhwIjoxNjQ1NDM2NTczfQ.O5EBFmYtinyw03b9mZP2wztuFHbwz2a-1nGEngrFKmI",
          },
        });
        setNewUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUser();
  });

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUser.map((user) => (
          <li className="widgetSmListItem">
            <img
              src={
                user.prpfilePic ||
                "https://static.wikia.nocookie.net/925fa2de-087e-47f4-8aed-4f5487f0a78c/scale-to-width/755"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
