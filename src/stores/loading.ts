// stores/loading.js
import { defineStore } from 'pinia'

export const useLoading = defineStore('loading', {
    state: () => ({
        loading: false
    }),
    actions: {
        toggleLoading(val: boolean) {
            this.loading = val ?? !this.loading // true/false yoki toggle
        }
    },
})
