import React from "react";
import { TaskStatuses } from "../TasksTable/data";
import './styles.css'

const TaskStatusMapper: Record<TaskStatuses, string> = {
  [TaskStatuses.PROGRESS]: "In progress",
  [TaskStatuses.COMPLETED]: "Completed",
  [TaskStatuses.REJECTED]: "Rejected",
};

type TaskStatusProps = {
  variant: TaskStatuses;
};

const TaskStatus: React.FC<TaskStatusProps> = ({ variant }) => {
  return (
    <div className={`${variant}`}>
      {TaskStatusMapper[variant]}
    </div>
  );
};

export default TaskStatus;
