/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: 'var(--color-brand)',
        primary: 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
        'primary-lighter': 'var(--color-primary-lighter)',
        black: 'var(--color-black)',
        'black-2': 'var(--color-black-2)',
        white: 'var(--color-white)',
        gray: {
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
        },
        footer: 'var(--color-footer)',
      },
      fontFamily: {
        title: 'var(--font-title)',
        body: 'var(--font-body)',
      },
      fontWeight: {
        regular: 'var(--font-weight-regular)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      fontSize: {
        /* Heading */
        'heading-1-medium': [
          'var(--text-heading-1-size)',
          { fontWeight: 'var(--text-heading-1-weight)' },
        ],

        'heading-1-regular': [
          'var(--text-heading-1-regular-size)',
          { fontWeight: 'var(--text-heading-1-regular-weight)' },
        ],

        'heading-4': [
          'var(--text-heading-4-size)',
          { fontWeight: 'var(--text-heading-4-weight)' },
        ],

        /* Body */
        'body-1': [
          'var(--text-body-1-size)',
          { fontWeight: 'var(--text-body-1-weight)' },
        ],

        'body-2': [
          'var(--text-body-2-size)',
          { fontWeight: 'var(--text-body-2-weight)' },
        ],

        'body-3': [
          'var(--text-body-3-size)',
          { fontWeight: 'var(--text-body-3-weight)' },
        ],

        'body-4': [
          'var(--text-body-4-size)',
          { fontWeight: 'var(--text-body-4-weight)' },
        ],

        /* Detail */
        'detail-1': [
          'var(--text-detail-1-size)',
          { fontWeight: 'var(--text-detail-1-weight)' },
        ],

        'detail-2': [
          'var(--text-detail-2-size)',
          { fontWeight: 'var(--text-detail-2-weight)' },
        ],
      },
    },
  },
  plugins: [],
};
