// src/composables/useTheme.ts
import { ref, watch } from 'vue'

const THEME_KEY = 'theme' // 'light' yoki 'dark'
const isDark = ref(false)

export function useTheme() {
    // boshlang'ich qiymat: localStorage > system preference > light
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'dark') {
        isDark.value = true
        document.documentElement.classList.add('dark')
    } else if (saved === 'light') {
        isDark.value = false
        document.documentElement.classList.remove('dark')
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        isDark.value = prefersDark
        if (prefersDark) document.documentElement.classList.add('dark')
    }

    function toggle() {
        isDark.value = !isDark.value
    }

    watch(isDark, (val) => {
        if (val) {
            document.documentElement.classList.add('dark')
            localStorage.setItem(THEME_KEY, 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem(THEME_KEY, 'light')
        }
    })

    return { isDark, toggle }
}
