import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const request = axios.create({
  timeout: 10000,
});

request.interceptors.request.use(
  config => {
    return config;
  }
);
request.interceptors.response.use(
  response => {
    return response.data;
  }
);


export function post<T>(url: string, data: any, config?: AxiosRequestConfig) {
  return request.post<T>(url, data, config).then(res => {
    if (res?.error) {
      return Promise.reject(new Error(res?.error));
    }
    return Promise.resolve(res);
  });
}