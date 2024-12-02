import { CircularProgress } from "@mui/material";
import {
  ArcElement,
  CategoryScale, Chart as ChartJS, Legend, LinearScale,
  Tooltip
} from 'chart.js';
import { useEffect, useState } from "react";
import { Pie } from 'react-chartjs-2';
import { useParams } from "react-router-dom";
import TaskService from '../../api/task.api';
import UserService from '../../api/user.api';
import { TaskStatuses } from '../Statistics/components/TasksTable/data';
import TaskStatus from "../Statistics/components/TaskStatus";

ChartJS.register(ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const TaskDetails = () => {
  const [taskDetails, setTaskDetails] = useState<any>(null);
  const [taskStatistics, setTaskStatistics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      if(!id) {
        return;
      }

      try {
        const taskDetailsResponse = await TaskService.getTaskById(id);
        setTaskDetails(taskDetailsResponse.data)

        const userResponse = await UserService.getUser();
        setUser(userResponse.data)

        const taskStatisticsResponse = await TaskService.getTaskStatistics(id);
        setTaskStatistics(taskStatisticsResponse.data)
      } catch (err) {
        console.log('error: ', err)
      } finally {
        setIsLoading(false)
      }
    };

    fetchTask();
  }, [id]);

  const data = {
    labels: ['Score 1-3', 'Score 4-6', 'Score 7-9', 'Score 10-11', 'Score 12'],
    datasets: [
      {
        data: taskStatistics ? Object.values(taskStatistics) : {},
        backgroundColor: ['#61b2fd', '#9bdfc3', '#f99bab', '#ffb44f', '#a097f8'],
      },
    ],
  };

  return (
    <div className="w-full bg-[#C8BCF6] p-[24px]">
      <div className={`w-full h-full bg-white flex ${isLoading ? 'justify-center items-center' : ''} flex-col rounded-lg shadow-lg`}>
        {isLoading ? (
          <CircularProgress sx={{ color: '#C8BCF6' }} />
        ) : (
          <>
            <img src={taskDetails.image_url} className="w-full h-[200px] object-cover rounded-t-lg" />
            <div className="w-full flex gap-12 p-4">
              <div className="flex flex-col gap-4 w-[55%]">
                <div className="flex justify-between w-full items-center">
                  <p className="font-bold text-2xl">{taskDetails.task_id} / {taskDetails.title.toUpperCase()}</p>
                  <TaskStatus variant={taskDetails.status as TaskStatuses} />
                </div>
                <p className="text-[#979797] font-semibold text-md">{taskDetails.course.toUpperCase()}</p>
                <div className="flex w-full justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <img src={user.image_url} className="w-16 h-16" />
                    <p className="font-semibold text-md">{user.username}</p>
                  </div>
                  <p className="font-semibold text-md">Score: {taskDetails.score}</p>
                </div>
                <p className="font-medium">{taskDetails.details}</p>
                <div className="w-full bg-[#e6e6e6] border-[1px] border-[#d0d4da] rounded-xl px-4 py-2">
                  <p>{taskDetails.answer}</p>
                </div>
                <div className="flex items-center mt-2 gap-6">
                  <p className="text-[#979797] font-medium text-lg">Have something to say about this task?</p>
                  <button
                    className="flex gap-4 items-center justify-center w-[135px] rounded-xl bg-[#624DE3] shadow-md py-[8px]"
                  >
                    <p className='text-[16px] font-bold text-white'>
                      Leave a note!
                    </p>
                  </button>
                </div>
              </div>
              <div className="flex flex-col w-[45%]">
                <div className="flex flex-col border-[1px] border-[#d0d4da] rounded-xl pt-6 px-8">
                  <p className="font-bold text-xl mb-[-24px]">Average rating in this task</p>
                  <Pie
                    data={data}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'right',
                        },
                        tooltip: {
                          callbacks: {
                            label: (studentAmount) => {
                              const value = studentAmount.raw;
                              return `${value} Student${value === 1 ? '' : 's'}`;
                            },
                          },
                        },
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div >
  )
}

export default TaskDetails