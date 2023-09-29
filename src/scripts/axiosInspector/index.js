import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL,
  /*   headers: { Authorization: `Bearer ${auth?.token}` }, */
});
axiosInstance.interceptors.request.use(async (req) => {
  return req;
});
export default axiosInstance;
