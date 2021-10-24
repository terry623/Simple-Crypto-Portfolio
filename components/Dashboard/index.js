import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";

import styles from "styles/Dashboard.module.css";
import { cryptos, dashboardColumns } from "constants";
import { calculateForDashboard } from "utils";

const Dashboard = ({ data, setData }) => {
  useEffect(() => {
    const fetchData = async () => {
      const doneOrders = await axios
        .get(`/api/getDoneOrders?cryptos=${cryptos}`)
        .then((res) => res.data);

      const prices = await axios
        .get(`/api/getPrices?cryptos=${cryptos}`)
        .then((res) => res.data);

        setData(calculateForDashboard(doneOrders, prices));
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Table columns={dashboardColumns} dataSource={data} />
    </div>
  );
};

export default Dashboard;
