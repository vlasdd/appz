import Task from "../models/task.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    return res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch tasks.',
      error: error.message,
    });
  }
}
