import dynamic from "next/dynamic";
import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";

import styles from "styles/Layout.module.css";
import Dashboard from "components/Dashboard";
import { cryptos } from "constants";
import { calculateForDashboard } from "utils";

const AssetPie = dynamic(() => import("components/AssetPie"), {
  ssr: false,
});

export default function Home() {
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const doneOrders = await axios
        .get(`/api/getDoneOrders?cryptos=${cryptos}`)
        .then((res) => res.data);

      const prices = await axios
        .get(`/api/getPrices?cryptos=${cryptos}`)
        .then((res) => res.data);

      setDashboardData(calculateForDashboard(doneOrders, prices));
    };

    fetchData();
  }, []);

  console.log(dashboardData);
  return (
    <div className={styles.container}>
      <Head>
        <title>Simple Crypto Portfolio</title>
      </Head>
      {dashboardData.length === 0 ? (
        <Spin />
      ) : (
        <>
          <AssetPie data={dashboardData} />
          <Dashboard data={dashboardData} />
        </>
      )}
    </div>
  );
}
