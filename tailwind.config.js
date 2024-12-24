/** @type {import('tailwindcss').Config} */
// tm 320 - 767 | md 768 - 1279 | xl 1280 - 1920
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        "tm": '320px'
      },
      fontFamily: {
        valorant: ['valorant', 'sans-serif'],
        stroke: ['stroke', 'sans-serif']
      },
      animation: {
        appear: 'appear 0.2s forwards',
        changed: 'changed 0.2s forwards',
        invalid_move: 'invalid_move 0.3s forwards',
        fade: 'fade var(--fade-duration)',
        scale_up: 'scale_up 0.2s',
        show: 'show 0.5s forwards',
        opening: 'opening 2s forwards'
      },
      keyframes: {
        appear: {
          from: { transform: 'scale(0)' },
          to: { transform: 'scale(1)' }
        },
        changed: {
          from: {
            opacity: '0',
            transform: 'translateY(20%)'
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        invalid_move: {
          '0%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-3%)' },
          '60%': { transform: 'translateX(2%)' },
          '100%': { transform: 'translateX(0)' }
        },
        fade: {
          '0%': {
            'background-color': 'transparent'
          },
          '50%': {
            'background-color': 'var(--fade-color)'
          },
          '100%': {
            'background-color': 'transparent'
          }
        },
        scale_up: {
          from: {
            transform: 'scale(5)'
          },
          to: {
            transform: 'scale(1)'
          }
        },
        show: {
          from: {
            transform: 'translateX(-20%)',
            opacity: 0
          },
          to: {
            transform: 'translateX(0)',
            opacity: 1
          }
        },
        opening: {
          '0%': {
            transform: 'scale(1)'
          },
          '10%': {
            transform: 'scaleY(0.9)'
          },
          '15%': {
            transform: 'scaleY(1.2)',
            transform: 'scaleX(1.1)',
            transform: 'rotate(5deg)',
            filter:
              'drop-shadow(1px 1px 10px #fff) drop-shadow(-1px -1px 10px #fff)'
          },
          '20%': {
            transform: 'rotate(-5deg)'
          },
          '25%': {
            transform: 'rotate(0deg)'
          },
          '35%': {
            transform: 'scale(1)'
          },
          '40%': {
            transform: 'scaleY(0.85)',
            filter: 'drop-shadow(0 0 0 #fff)'
          },
          '45%': {
            transform: 'scaleY(1.05)',
            transform: 'scaleX(1.12)',
            transform: 'rotate(8deg)',
            filter:
              'drop-shadow(1px 1px 10px #fff) drop-shadow(-1px -1px 10px #fff)'
          },
          '50%': {
            transform: 'rotate(-9deg)'
          },
          '55%': {
            transform: 'rotate(0deg)'
          },
          '95%': {
            transform: 'scale(0.5) rotate(-3deg)',
            opacity: '1',
            filter: 'drop-shadow(0 0 0 #fff)'
          },
          '100%': {
            transform: 'scale(1.2) rotate(3deg)',
            opacity: '0',
            display: 'none'
          }
        }
      },
      backgroundImage: {
        v_red_gradient: 'linear-gradient(0deg, #cd515d 0%, #da3848 100%)',
        v_aqua_gradient: 'linear-gradient(0deg, #7ea9ab 0%, #6a9a9c 100%)',
        v_opener_gradient:
          'linear-gradient(220deg,#65204c,#6c2d4c 17%,#591e47 39%,#240919 81%,#3e102d 100%)',
        v_gray_gradient:
          'linear-gradient(0deg, rgba(52,52,52,1) 0%, rgba(112,112,112,1) 100%);'
      },
      colors: {
        v_red: '#da3848',
        v_aqua: '#00ffff',
        v_ally: '#348ac7',
        v_enemy: '#b83231',
        v_gray: '#292929',
        v_black: '#0b1430',
        v_red_gradient: 'linear-gradient(0deg, #cd515d 0%, #da3848 100%)',
        v_aqua_gradient: 'linear-gradient(0deg, #7ea9ab 0%, #6a9a9c 100%)'
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.clip-header-aside': {
          'clip-path': 'polygon(7% 0, 93% 0, 100% 100%, 0% 100%)'
        },
        '.clip-header-center': {
          'clip-path': 'polygon(10% 0, 90% 0, 100% 80%, 50% 100%, 0 80%)'
        }
      })
    }
  ]
}
