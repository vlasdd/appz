import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createTaskStatusComponent } from "./";
import { TaskStatuses } from "../TasksTable/data";

describe("createTaskStatusComponent", () => {
  it("створює компонент з класом 'progress' та текстом 'In progress'", () => {
    const { container, getByText } = render(createTaskStatusComponent(TaskStatuses.PROGRESS));
    expect(container.firstChild).toHaveClass("in_progress");
    expect(getByText("In progress")).toBeInTheDocument();
  });

  it("створює компонент з класом 'completed' та текстом 'Completed'", () => {
    const { container, getByText } = render(createTaskStatusComponent(TaskStatuses.COMPLETED));
    expect(container.firstChild).toHaveClass("completed");
    expect(getByText("Completed")).toBeInTheDocument();
  });

  it("створює компонент з класом 'rejected' та текстом 'Rejected'", () => {
    const { container, getByText } = render(createTaskStatusComponent(TaskStatuses.REJECTED));
    expect(container.firstChild).toHaveClass("rejected");
    expect(getByText("Rejected")).toBeInTheDocument();
  });

  it("кидає помилку, якщо передано недійсний статус", () => {
    // @ts-ignore
    expect(() => createTaskStatusComponent("invalidStatus")).toThrow();
  });
});
