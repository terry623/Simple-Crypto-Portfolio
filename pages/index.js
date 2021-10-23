import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";

import styles from "../styles/Home.module.css";
import { cryptos, dashboardColumns } from "./constants";
import { calculateForDashboard } from "./utils";

export default function Home() {
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const doneOrders = await axios
        .get(`/api/getDoneOrders?cryptos=${cryptos}`)
        .then((res) => res.data);

      let prices = await axios
        .get(`/api/getPrices?cryptos=${cryptos}`)
        .then((res) => res.data);

      prices = prices.reduce(function (acc, cur, i) {
        acc[Object.keys(cur)[0]] = Object.values(cur)[0];
        return acc;
      }, {});

      setDashboardData(calculateForDashboard(doneOrders, prices));
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Table columns={dashboardColumns} dataSource={dashboardData} />
    </div>
  );
}
