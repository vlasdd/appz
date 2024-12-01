import axiosInstance from ".";

class TaskService {
   async getAllTasks(): Promise<any> {
    const response = await axiosInstance.get("/tasks");
    return response.data; 
  }
}

const instance = new TaskService();


export default instance;
