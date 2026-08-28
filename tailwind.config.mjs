/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', 'Instrument Sans', 'Inter', 'sans-serif'],
                display: ['Figtree', 'Outfit', 'sans-serif'],
            },
            colors: {
                primary: {
                    50: '#f3f8fd',
                    100: '#e4eef8',
                    200: '#c5daf0',
                    300: '#8bb8e8',
                    400: '#4e92d8',
                    500: '#4e92d8',
                    600: '#003153',
                    700: '#003153',
                    800: '#02243d',
                    900: '#01182a',
                    950: '#010d16',
                },
            },
            animation: {
                blob: 'blob 7s infinite',
                marquee: 'marquee 28s linear infinite',
                'fade-in-up': 'fade-in-up 0.7s ease-out forwards',
                'fade-in': 'fade-in 0.6s ease-out forwards',
                'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
                glow: 'glow 3s ease-in-out infinite',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                marquee: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-50%)' },
                },
                'fade-in-up': {
                    from: { opacity: '0', transform: 'translateY(16px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in': {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
                'slide-in-right': {
                    from: { opacity: '0', transform: 'translateX(-12px)' },
                    to: { opacity: '1', transform: 'translateX(0)' },
                },
                glow: {
                    '0%, 100%': { opacity: '0.4' },
                    '50%': { opacity: '1' },
                },
            },
        },
    },
    plugins: [],
};
