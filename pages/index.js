import dynamic from "next/dynamic";
import { useState } from "react";

import Dashboard from "components/Dashboard";

const AssetPie = dynamic(() => import("components/AssetPie"), {
  ssr: false,
});

export default function Home() {
  const [dashboardData, setDashboardData] = useState([]);

  return (
    <>
      <AssetPie data={dashboardData} />
      <Dashboard data={dashboardData} setData={setDashboardData} />;
    </>
  );
}
