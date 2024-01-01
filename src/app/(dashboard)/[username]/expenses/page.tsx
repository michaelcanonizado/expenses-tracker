import React from "react";

import DashboardTable from "@/components/dashboard/table/DashboardTable";

import { getData } from "@/lib/getSheetsData";

const Home = async () => {
  const data = await getData();

  return (
    <div className="min-h-screen p-6">
      <DashboardTable data={data} />
    </div>
  );
};

export default Home;
