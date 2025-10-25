import axios from "axios";

const baseURL = "http://localhost:4000/api";

export const http = axios.create({ baseURL });

/** Interceptors */
// http.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// http.interceptors.request.use(
//   request => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       request.headers.Authorization = `Bearer ${token}`;
//     }
//     return request;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );
