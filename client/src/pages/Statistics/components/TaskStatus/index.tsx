import React from "react";
import { TaskStatuses } from "../TasksTable/data";
import "./styles.css";

type TaskStatusProps = {
  variant: TaskStatuses;
};

type TaskStatusFactory = (variant: TaskStatuses) => JSX.Element;

export const createTaskStatusComponent: TaskStatusFactory = (variant) => {
  const TaskStatusMapper: Record<TaskStatuses, string> = {
    [TaskStatuses.PROGRESS]: "In progress",
    [TaskStatuses.COMPLETED]: "Completed",
    [TaskStatuses.REJECTED]: "Rejected",
  };

  if (!TaskStatusMapper[variant]) {
    throw new Error(`Invalid status: ${variant}`);
  }

  const statusClass = variant.toLowerCase();
  const statusLabel = TaskStatusMapper[variant];

  return (
    <div className={statusClass}>
      {statusLabel}
    </div>
  );
};

const TaskStatus: React.FC<TaskStatusProps> = ({ variant }) => {
  return createTaskStatusComponent(variant);
};

export default TaskStatus;
