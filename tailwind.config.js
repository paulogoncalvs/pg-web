const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class', // false or 'media' or 'class'

    theme: {
        nightwind: {
            colors: {
                white: 'gray.900',
            },
        },
        fontFamily: {
            sans: ['Roboto', ...defaultTheme.fontFamily.sans.filter((item) => item !== 'Roboto')],
            serif: ['Roboto Slab', ...defaultTheme.fontFamily.serif],
        },
        extend: {
            keyframes: {
                'fade-in': {
                    '0%': {
                        opacity: '0',
                    },
                    '100%': {
                        opacity: '1',
                    },
                },
                'fade-in-up': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(10px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.2s ease-in 0s forwards',
                'fade-in-up-1': 'fade-in-up 0.5s ease-out 0.7s forwards',
                'fade-in-up-2': 'fade-in-up 0.5s ease-out 1.2s forwards',
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
    plugins: [require('nightwind')],
};
