import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";

import styles from "styles/Layout.module.css";
import Dashboard from "components/Dashboard";

const AssetPie = dynamic(() => import("components/AssetPie"), {
  ssr: false,
});

export default function Home() {
  const [dashboardData, setDashboardData] = useState([]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Simple Crypto Portfolio</title>
      </Head>
      <AssetPie data={dashboardData} />
      <Dashboard data={dashboardData} setData={setDashboardData} />
    </div>
  );
}
