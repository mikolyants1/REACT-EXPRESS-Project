import axios, { AxiosInstance } from "axios";

export const baseUrl:AxiosInstance = axios.create({
  baseURL:"http://localhost:5000/"
})