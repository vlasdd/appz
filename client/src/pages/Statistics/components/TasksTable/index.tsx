import { useEffect, useState } from "react";
import MUIDataTable, { MUIDataTableMeta } from "mui-datatables";
import { CircularProgress } from "@mui/material";
import { tasksData, TaskStatuses } from "./data";
import "./styles.css";
import TaskStatus from "../TaskStatus";
import { useNavigate } from "react-router-dom";
import TaskService from '../../../../api/task.api'
import { getIdForNavigation } from "../../../../helpers/navigation";
import { formatDate } from "../../../../helpers/date";

const getColumns = (viewDetails: (id: string) => void) => [
  {
    name: "task_id",
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
    name: "date_started",
    label: "Date Started",
    options: {
      filter: false,
      customBodyRender: (value: string) => {
        return formatDate(value);
      },
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
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const response = await TaskService.getAllTasks();
        setData(response.data)
        console.log('response.data', response)
      } catch (err) {
        console.log('error')
      } finally {
        setIsLoading(false)
      }
    };

    fetchTasks();
  }, []);

  // useEffect(() => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setData(tasksData);
  //     setIsLoading(false);
  //   }, 1000);
  // }, []);

  const viewDetails = (id: string) => {
    navigate(`/statistics/${getIdForNavigation(id)}`);
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
