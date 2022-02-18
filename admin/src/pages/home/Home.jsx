import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);

  // fetching data
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("users/stats", {
          headers: {
            token:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDBkMmVlODFmZjg0MmM0NzZkNTYwZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NTAwNDU3MywiZXhwIjoxNjQ1NDM2NTczfQ.O5EBFmYtinyw03b9mZP2wztuFHbwz2a-1nGEngrFKmI",
          },
        });

        // for each res.data, add to userStats with {name: the name of the month} --> ex: id=6 = MONTH[6-1] (which is June)
        // prev : add to userStats but keep the previous data, so we use ...prev. Then add {name: month name}
        const statsList = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, []);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
