type TaskData = {
  taskId: string,
  course: string
  title: string
  dateStarted: string
  score: string
  details: string
  status: TaskStatuses
}

export enum TaskStatuses {
  PROGRESS = "in_progress",
  COMPLETED = "completed",
  REJECTED = "rejected"
}

export const tasksData: TaskData[] = [
  {taskId: '#20462', course: 'Course1', title: 'Build an application', dateStarted: '13/05/2022', score: '6/10', details: 'This task contains... ', status: 'completed'},
  {taskId: '#18933', course: 'Course2', title: 'Build an application', dateStarted: '22/05/2022', score: '6/10', details: 'This task contains... ', status: 'completed'},
  {taskId: '#45169', course: 'Course3', title: 'Build an application', dateStarted: '15/06/2022', score: '6/10', details: 'This task contains... ', status: 'in_progress'},
  {taskId: '#34304', course: 'Course4', title: 'Build an application', dateStarted: '06/09/2022', score: '6/10', details: 'This task contains... ', status: 'in_progress'},
  {taskId: '#17188', course: 'Course5', title: 'Build an application', dateStarted: '25/09/2022', score: '6/10', details: 'This task contains... ', status: 'rejected'},
  {taskId: '#73003', course: 'Course6', title: 'Build an application', dateStarted: '04/10/2022', score: '6/10', details: 'This task contains... ', status: 'completed'},
  {taskId: '#58825', course: 'Course7', title: 'Build an application', dateStarted: '17/10/2022', score: '6/10', details: 'This task contains... ', status: 'completed'},
  {taskId: '#44122', course: 'Course8', title: 'Build an application', dateStarted: '24/10/2022', score: '6/10', details: 'This task contains... ', status: 'completed'},
  {taskId: '#13200', course: 'Course9', title: 'Build an application', dateStarted: '01/11/2022', score: '7/10', details: 'This task contains... ', status: 'in_progress'},
  {taskId: '#17402', course: 'Course10', title: 'Build an application', dateStarted: '10/11/2022', score: '8/10', details: 'This task contains... ', status: 'in_progress'},
  {taskId: '#11577', course: 'Course11', title: 'Build an application', dateStarted: '12/11/2022', score: '5/10', details: 'This task contains... ', status: 'rejected'},
  {taskId: '#26783', course: 'Course12', title: 'Build an application', dateStarted: '18/11/2022', score: '9/10', details: 'This task contains... ', status: 'completed'},
  {taskId: '#11239', course: 'Course13', title: 'Build an application', dateStarted: '19/11/2022', score: '6/10', details: 'This task contains... ', status: 'in_progress'},
  {taskId: '#29002', course: 'Course14', title: 'Build an application', dateStarted: '20/11/2022', score: '7/10', details: 'This task contains... ', status: 'completed'},
  {taskId: '#15045', course: 'Course15', title: 'Build an application', dateStarted: '21/11/2022', score: '8/10', details: 'This task contains... ', status: 'completed'},
  {taskId: '#13245', course: 'Course16', title: 'Build an application', dateStarted: '22/11/2022', score: '6/10', details: 'This task contains... ', status: 'in_progress'},
  {taskId: '#25467', course: 'Course17', title: 'Build an application', dateStarted: '23/11/2022', score: '5/10', details: 'This task contains... ', status: 'in_progress'},
  {taskId: '#30258', course: 'Course18', title: 'Build an application', dateStarted: '25/11/2022', score: '6/10', details: 'This task contains... ', status: 'completed'},
  {taskId: '#45278', course: 'Course19', title: 'Build an application', dateStarted: '26/11/2022', score: '8/10', details: 'This task contains... ', status: 'completed'},
  {taskId: '#53981', course: 'Course20', title: 'Build an application', dateStarted: '27/11/2022', score: '9/10', details: 'This task contains... ', status: 'rejected'}
] as unknown as TaskData[];