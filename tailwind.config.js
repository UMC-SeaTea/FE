/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand / Blue scale
        brand: 'var(--color-brand)',
        'deep-blue': 'var(--color-deep-blue)',
        'main-blue': 'var(--color-main-blue)',
        'light-blue': 'var(--color-light-blue)',
        'light-blue-2': 'var(--color-light-blue-2)',

        // Neutral / Gray
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

        // Layout
        footer: 'var(--color-footer)',

        // Card color (Cool green variation)
        'card-purple': 'var(--color-card-purple)',
        'card-pink': 'var(--color-card-pink)',
        'card-blue': 'var(--color-card-blue)',
        'card-green': 'var(--color-card-green)',
      },

      fontFamily: {
        title: 'var(--font-title)',
        body: 'var(--font-body)',
      },

      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },

      
      fontSize: {
        /* Samsung Sharp Sans (Title) */
        'title-1': ['var(--text-title-1-size)', { fontWeight: 'var(--text-title-1-weight)' }],
        'logo-title': [
          'var(--text-logo-title-size)',
          { fontWeight: 'var(--text-logo-title-weight)' },
        ],
        'title-2': ['var(--text-title-2-size)', { fontWeight: 'var(--text-title-2-weight)' }],
        'title-3': ['var(--text-title-3-size)', { fontWeight: 'var(--text-title-3-weight)' }],
        'title-4': ['var(--text-title-4-size)', { fontWeight: 'var(--text-title-4-weight)' }],

        /* Pretendard (Body) */
        'body-title': [
          'var(--text-body-title-size)',
          { fontWeight: 'var(--text-body-title-weight)' },
        ],
        'body-1': ['var(--text-body-1-size)', { fontWeight: 'var(--text-body-1-weight)' }],
        'body-2': ['var(--text-body-2-size)', { fontWeight: 'var(--text-body-2-weight)' }],
        'body-3': ['var(--text-body-3-size)', { fontWeight: 'var(--text-body-3-weight)' }],
        'body-4': ['var(--text-body-4-size)', { fontWeight: 'var(--text-body-4-weight)' }],
        'body-5': ['var(--text-body-5-size)', { fontWeight: 'var(--text-body-5-weight)' }],

        /* Detail */
        'detail-1': ['var(--text-detail-1-size)', { fontWeight: 'var(--text-detail-1-weight)' }],
        'detail-2': ['var(--text-detail-2-size)', { fontWeight: 'var(--text-detail-2-weight)' }],
        'detail-3': ['var(--text-detail-3-size)', { fontWeight: 'var(--text-detail-3-weight)' }],
        'detail-4': ['var(--text-detail-4-size)', { fontWeight: 'var(--text-detail-4-weight)' }],
      },
    },
  },
  plugins: [],
};
