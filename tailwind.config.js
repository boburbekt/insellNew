/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // primary: '#015812',
                primary: '#192a78',
                secondary: '#7FAB88',
                white: '#FFFFFF',
                danger: '#830303',
                'primary-dark': '#1e40af',
                'sidebar-bg': '#0158122a',
                'card': '#E6EFE8',
                'modal': '#E6EFE8',
                'card-dark': '#bed8c5',
                'sidebar-active': '#B8D1BE',
                'secondary-danger': "#C08080",
                success: '#4CAF50',
                'table-header': "#01581280",
                warning: '#FFEB3B',
            },
            fontFamily: {
                sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
                jaldi: ['Jaldi', 'sans-serif'],
                inter: ["Inter", 'sans-serif'],
            },
        },
        screens: {
            'xs': '320px',
            '2xs': '360px',
            '3xs': '480px',
            '4xs': '414px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '0.8rem',
                xl: '10rem',
            }
        },
    },
}