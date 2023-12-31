import React from "react";

import DashboardRecordForm from "@/components/dashboard/track/DashboardRecordForm";

const TrackExpense = () => {
  return (
    <div className="mx-auto w-fit">
      <div className="mt-8 rounded border px-6 py-14 sm:px-12">
        <div className="mb-10">
          <h1 className="text-4xl">Track Expense</h1>
        </div>
        <DashboardRecordForm variant="expenses" />
      </div>
    </div>
  );
};

export default TrackExpense;
