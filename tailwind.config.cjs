/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        fontFamily: {
            sans: ['Poppins', 'Roboto', ...defaultTheme.fontFamily.sans.filter((item) => item !== 'Roboto')],
        },
        extend: {
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in-dw': {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.2s ease-in-out 0s forwards',
                'fade-in-up-1': 'fade-in-up 0.5s ease-in-out 0.4s forwards',
                'fade-in-up-2': 'fade-in-up 0.5s ease-in-out 0.5s forwards',
                'fade-in-up-3': 'fade-in-up 0.5s ease-in-out 0.7s forwards',
                'fade-in-up-4': 'fade-in-up 0.5s ease-in-out 0.8s forwards',
                'fade-in-up-5': 'fade-in-up 0.5s ease-in-out 1.0s forwards',
                'fade-in-dw-1': 'fade-in-dw 0.5s ease-in-out 0.4s forwards',
                'fade-in-dw-2': 'fade-in-dw 0.5s ease-in-out 0.5s forwards',
                'fade-in-dw-3': 'fade-in-dw 0.5s ease-in-out 0.7s forwards',
                'fade-in-dw-4': 'fade-in-dw 0.5s ease-in-out 0.8s forwards',
                'fade-in-dw-5': 'fade-in-dw 0.5s ease-in-out 1.0s forwards',
            },
        },
    },
    corePlugins: {
        filter: false,
        blur: false,
        brightness: false,
        contrast: false,
        grayscale: false,
        hueRotate: false,
    },
    plugins: [require('@tailwindcss/forms')],
};
