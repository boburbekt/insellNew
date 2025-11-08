import axios from 'axios'
import type { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'


import baseurl from '@/server/baseurl';
import store from '@/store/index';
import handleError from '@/server/handle';
import router from '@/router';
import pinia from '@/pinia'; // main.ts dagi pinia instansiyasi
import { setActivePinia } from 'pinia'
import util from './util';
setActivePinia(pinia)
import { useLoading } from '@/stores/loading'
const loadingStore = useLoading();
interface RefreshResponse {
  access_token: string;
  refresh_token: string;
  [key: string]: any;
}

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string): void {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (token: string) => void): void {
  refreshSubscribers.push(callback);
}

const apiClient = axios.create({
  baseURL: baseurl,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = store.state.user?.access_token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post<RefreshResponse>(
          `${baseurl}refresh_token?token=${store.state?.user?.access_token}`
        );

        const newToken = data.access_token;
        store.dispatch("setUser", data);

        onRefreshed(newToken);
        isRefreshing = false;

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        return apiClient(originalRequest);
      } catch (err) {
        isRefreshing = false;
        router.push('/sign-in');
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default async function server<T = any>(
  endpoint = '',
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' = 'get',
  data: any = null
): Promise<AxiosResponse<T>> {
  await store.dispatch('setLoading', true);
  let result: AxiosResponse<T> | null = null;
  let error: any = null;
  loadingStore.toggleLoading(true);
  await apiClient
    .request<T>({
      url: endpoint,
      method,
      data,
    })
    .then((res) => {
      result = res;
      if (method !== 'get') {
        util.toast2('Amaliyot bajarildi !')
      }
    })
    .catch((err) => {
      error = err;
      handleError(err);
    })
    .finally(() => {
      loadingStore.toggleLoading(false);
      store.dispatch('setLoading', false);
    });

  return new Promise((resolve, reject) => {
    if (result) resolve(result);
    else reject(error);
  });
}

