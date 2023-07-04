import axios from "axios";
import cookie from "js-cookie";
import { logoutAuth } from "src/hooks/useLogout";

const baseUrl = process.env.NEXT_PUBLIC_API

const config = {
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
      
};
 
const axiosApi = axios.create(config);

axiosApi.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("accessToken")
    if (token) config.headers.Authorization = `Bearer ${token}`;

      return config;
  },
  async (error) => {
    if(error){
      console.log(error)

      if(error.response.status === 401){
        console.log(error)
        localStorage.removeItem('userData')
        localStorage.removeItem('accessToken')
        logoutAuth()
      }
    }
      
      return Promise.reject(error)
  }
);

axiosApi.interceptors.response.use(
  async (response) => response,
  async (error) => {
      const originalRequest = error.config;
        if(error){
          console.log(error)

          if(error.response.status === 401){
            console.log(error)
            localStorage.removeItem('userData')
            localStorage.removeItem('accessToken')
            logoutAuth()
          }
        }
    
      return Promise.reject(error);
  }
)


export default axiosApi;