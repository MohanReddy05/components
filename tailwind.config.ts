/** @type {import('tailwindcss').Config} */
module.exports = {
    // darkMode: 'class',
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0070f3', // Example blue color
                    foreground: '#ffffff', // Example white text
                },
                destructive: {
                    DEFAULT: '#ef4444', // Example red color
                    foreground: '#ffffff', // Example white text
                },
                secondary: {
                    DEFAULT: '#6b7280', // Example gray color
                    foreground: '#ffffff', // Example white text
                },
                accent: {
                    DEFAULT: '#f3f4f6', // Example light gray color
                    foreground: '#030712', // Example dark text
                },
                input: '#e5e7eb',
                ring: '#0070f3',
                background: '#ffffff',
            },
        },
    },
    plugins: [
        require('tailwindcss-pseudo-elements')({
            customPseudoClasses: ['before', 'after', 'focus', 'valid'],
        }),
    ],
};
