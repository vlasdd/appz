import axiosInstance from ".";

class UserService {
   async getUser(): Promise<any> {
    const response = await axiosInstance.get("/user");
    return response.data; 
  }
}

const instance = new UserService();

export default instance;
