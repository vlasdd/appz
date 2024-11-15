import React from "react";
import TasksTable from "./components/TasksTable";

const Statistics = () => {
  return (
    <div className="w-full bg-[#C8BCF6] flex gap-8 p-[32px] pt-[96px] flex-col">
      <TasksTable />
    </div>
  );
};

export default Statistics;
