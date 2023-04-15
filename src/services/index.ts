/* eslint-disable github/no-then */
import { _OneSecond } from '@/constants';
import axios from 'axios';

const API = axios.create({
	baseURL: 'https://dummyjson.com/',
	timeout: _OneSecond * 10, // 10s
	headers: {
		'content-type': 'application/json',
	},
	responseType: 'json',
});

API.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
API.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

export const getFetcher = <T>(url: string) => API.get<T>(url).then((res) => res);

export const postFetcher = <T>(url: string, data: object = {}) => API.post<T>(url, data).then((res) => res);
