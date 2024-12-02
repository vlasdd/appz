import axiosInstance from ".";

class TaskService {
   async getAllTasks(): Promise<any> {
    const response = await axiosInstance.get("/tasks");
    return response.data; 
  }
  async getTaskById(id: string): Promise<any> {
    const response = await axiosInstance.get(`/tasks/${id}`);
    return response.data; 
  }
  async getTaskStatistics(id: string): Promise<any> {
    const response = await axiosInstance.get(`/tasks/${id}/statistics`);
    return response.data; 
  }
}

const instance = new TaskService();


export default instance;
