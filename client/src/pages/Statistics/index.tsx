import React from "react";
import TasksTable from "./components/TasksTable";
import Tabs from "./components/Tabs";

const Statistics = () => {
  return (
    <div className="w-full gap-8 p-[32px] pt-[40px]">
      <Tabs />
      <TasksTable />
    </div>
  );
};

export default Statistics;
