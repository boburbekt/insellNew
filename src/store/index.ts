import { createStore } from 'vuex';

export interface User {
  access_token: string;
  country_tel_code?: number | string;
  country_tel_length?: number | string;
  token_type?: string;
}

function safelyParseJSON(item: string | null) {
  try {
    return item ? JSON.parse(item) : null;
  } catch (error) {
    return null;
  }
}

export default createStore({
  state: {
    user: safelyParseJSON(localStorage.getItem('user')) as User | null,
    token: safelyParseJSON(localStorage.getItem('token')) as string | null,
    loading: false,
    showNotification: false,
  },
  actions: {
    setUser({ commit }, user: User) {
      commit('setUser', user);
    },
    setToken({ commit }, token: string) {
      commit('setToken', token);
    },
    setLoading({ commit }, loading: boolean) {
      commit('setLoading', loading);
    },
    setShowNotification({ commit }, show: boolean) {
      commit('setShowNotification', show);
    },
  },
  mutations: {
    setUser(state, user: User) {
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    setToken(state, token: string) {
      localStorage.setItem('token', JSON.stringify(token));
      state.token = token;
    },
    setLoading(state, loading: boolean) {
      state.loading = loading;
    },
    setShowNotification(state, show: boolean) {
      state.showNotification = show;
    },
  },
  getters: {
    user: (state) => state.user,
    loading: (state) => state.loading,
    token: (state) => state.token,
    showNotification: (state) => state.showNotification,
  },
});
