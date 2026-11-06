/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F8F6',
        surface: '#FFFFFF',
        navy: {
          900: '#0F1D27',
          DEFAULT: '#172D3D',
          light: '#263E4D',
          soft: '#365366',
        },
        sage: {
          light: '#EDF3EE',
          soft: '#DCE8DF',
          DEFAULT: '#7E9B89',
          dark: '#587463',
        },
        primaryText: '#202D35',
        secondaryText: '#75818A',
        borderLine: '#E7EBE8',
        warm: '#F3F0EA',
        gold: '#B79A69',
        status: {
          success: '#3B7A57',
          successBg: '#EEF7F2',
          pending: '#B87A28',
          pendingBg: '#FEF7EC',
          attention: '#C45738',
          attentionBg: '#FDF2EE',
          error: '#BD3838',
          errorBg: '#FDECEC',
          info: '#2B6E96',
          infoBg: '#EDF5FA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(23, 45, 61, 0.04), 0 1px 2px 0 rgba(23, 45, 61, 0.02)',
        card: '0 2px 8px -2px rgba(23, 45, 61, 0.05), 0 1px 4px -1px rgba(23, 45, 61, 0.03)',
        floating: '0 12px 32px -8px rgba(23, 45, 61, 0.12), 0 4px 12px -2px rgba(23, 45, 61, 0.04)',
      },
      borderRadius: {
        'lg': '12px',
        'xl': '14px',
        '2xl': '18px',
      }
    },
  },
  plugins: [],
}

