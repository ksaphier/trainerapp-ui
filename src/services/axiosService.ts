import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.17:8080",
});

async function handleRequest(
  request: () => Promise<AxiosResponse>
): Promise<[any, any]> {
  try {
    const response = await request();
    return [response.data, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
}

export const axiosService = {
  get: (path: string, config: object = {}) =>
    handleRequest(() => axiosInstance.get(path, config)),
  post: (path: string, data: object, config: object = {}) =>
    handleRequest(() => axiosInstance.post(path, data, config)),
  put: (path: string, data: object, config: object = {}) =>
    handleRequest(() => axiosInstance.put(path, data, config)),
  delete: (path: string, config: object = {}) =>
    handleRequest(() => axiosInstance.delete(path, config)),
};
