import axios from "axios";

// const apiEndpoint = "http://localhost:3000/"
const apiEndpoint = "https://todo-backend.cyclic.app/"

const axiosClient = axios.create();

axiosClient.defaults.baseURL = apiEndpoint;

axiosClient.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export async function getRequest(URL) {
  return axiosClient.get(`/${URL}`).then((response) => response.data);
}

export async function postRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then((response) => response.data);
}

export async function patchRequest(URL, payload) {
  return axiosClient
    .patch(`/${URL}`, payload)
    .then((response) => response.data);
}

export async function putRequest(URL, payload) {
  return axiosClient
    .put(`/${URL}`, payload)
    .then((response) => response.data);
}

export async function deleteRequest(URL) {
  return axiosClient.delete(`/${URL}`).then((response) => response.data);
}
