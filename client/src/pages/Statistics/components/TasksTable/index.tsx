import { useEffect, useState } from "react";
import MUIDataTable, { MUIDataTableMeta } from "mui-datatables";
import { CircularProgress } from "@mui/material";
import { tasksData, TaskStatuses } from "./data";
import "./styles.css";
import TaskStatus from "../TaskStatus";
import { useNavigate } from "react-router-dom";

const getColumns = (viewDetails: (id: string) => void) => [
  {
    name: "taskId",
    label: "Task ID",
    options: {
      filter: false,
    },
  },
  {
    name: "course",
    label: "Course",
    options: {
      filter: false,
    },
  },
  {
    name: "title",
    label: "Title",
    options: {
      filter: false,
    },
  },
  {
    name: "dateStarted",
    label: "Date Started",
    options: {
      filter: false,
    },
  },
  {
    name: "score",
    label: "Your score",
    options: {
      customBodyRender: (value: string) => {
        return `${value}`;
      },
      filter: false,
    },
  },
  {
    name: "details",
    label: "Task details",
    options: {
      filter: false,
    },
  },
  {
    name: "status",
    label: "Status",
    options: {
      customBodyRender: (value: string, data: MUIDataTableMeta) => {
        return <TaskStatus variant={value as TaskStatuses} />;
      },
    },
  },
  {
    name: "",
    label: "",
    options: {
      customBodyRender: (value: string, data: MUIDataTableMeta) => {
        const id = data.rowData.at(0);
        return (
          <button onClick={() => viewDetails(id)} className="view_details">
            View Details
          </button>
        );
      },
      filter: false,
      sort: false,
      download: false,
      print: false,
    },
  },
];

const TasksTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setData(tasksData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const viewDetails = (id: string) => {
    navigate(`/statistics/${id.slice(1, id.length)}`);
  };

  return (
    <div
      id="tasks_table"
      className="w-full flex gap-8 p-[32px] flex-col w-full"
    >
      <MUIDataTable
        title="Tasks"
        data={data}
        columns={getColumns(viewDetails)}
        options={{
          filter: true,
          filterType: "dropdown",
          responsive: "standard",
          enableNestedDataAccess: ".",
          viewColumns: true,
          selectableRows: "none",
          textLabels: {
            body: {
              noMatch: isLoading ? (
                <CircularProgress sx={{ color: "#C8BCF6" }} />
              ) : (
                "Sorry, no tasks found"
              ),
            },
          },
        }}
      />
    </div>
  );
};

export default TasksTable;
