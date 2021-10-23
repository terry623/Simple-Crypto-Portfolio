import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";

import styles from "../styles/Home.module.css";
import { cryptos, dashboardColumns } from "./constants";
import { calculateForDashboard } from "./utils";

export default function Home() {
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    const fetchDoneOrders = async () => {
      const response = await axios
        .get(`/api/getDoneOrders?cryptos=${cryptos}`)
        .then((res) => res.data);
      setDashboardData(calculateForDashboard(response));
    };

    fetchDoneOrders();
  }, []);

  return (
    <div className={styles.container}>
      <Table columns={dashboardColumns} dataSource={dashboardData} />
    </div>
  );
}
