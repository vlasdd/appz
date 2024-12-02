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

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        task_id: `#${req.params.id}`,
      }
    });
    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error('Error fetching task by id:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch task by id.',
      error: error.message,
    });
  }
}

export const getTaskStatistics = async (req, res) => {
  return res.status(200).json({
    data: {
      oneToThreeRating: 4,
      fourToSixRating: 1,
      SevenToNineRating: 6,
      TenToElevenRating: 8,
      TwelweRating: 10,
    }
  })
}
