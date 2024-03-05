import axios from 'axios';
//import { useToken } from "hooks/useToken.hook";

// constants


const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});
//console.log('BASE_URL : ',BASE_URL);
api.interceptors.request.use(
  (config) => {
   // const token = useToken();
    config.headers["ngrok-skip-browser-warning"] = "69420";
    /*
    const auth = token ? `Bearer ${token}` : '';
    config.headers.common['Authorization'] = auth;
    */
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;