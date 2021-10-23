import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Tag, Space } from "antd";

import styles from "../styles/Home.module.css";
import { cryptos, dashboardColumns } from "./constants";

export default function Home() {
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    const fetchDoneOrders = async () => {
      const response = await axios
        .get(`/api/getDoneOrders?cryptos=${cryptos}`)
        .then((res) => res.data);
      console.log(response);
    };

    fetchDoneOrders();
  }, []);

  return (
    <div className={styles.container}>
      <Table columns={dashboardColumns} dataSource={dashboardData} />
    </div>
  );
}
