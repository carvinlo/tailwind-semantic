const { colors } = require('tailwindcss/defaultTheme');
const { variants } = require('tailwindcss/defaultConfig');

module.exports = {
  variants: {
    ...variants,
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    position: ['responsive', 'important'],
  },
  theme: {
    extend: {
      colors: {
        blue: {
          ...colors.blue,
          '900': '#1e3656',
        }
      },
      spacing: {
        px: '1px',
        '0': '0',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '25px',
        '6': '30px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
        '40': '160px',
        '48': '192px',
        '56': '224px',
        '64': '256px',
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        default: '4px',
        lg: '8px',
        full: '9999px',
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
        '5xl': '48px',
        '6xl': '64px',
      },
      maxWidth: {
        xs: '320px',
        sm: '384px',
        md: '448px',
        lg: '512px',
        xl: '576px',
        '2xl': '672px',
        '3xl': '768px',
        '4xl': '896px',
        '5xl': '1024px',
        '6xl': '1152px',
        full: '100%',
      },
      minHeight: {
        '0': '0',
        full: '100%',
        screen: '100vh',
        'half-screen': '50vh',
      },
      minWidth: {
        '0': '0',
        full: '100%',
        screen: '100vw',
        'half-screen': '50vw',
      },
    }
  },
  plugins: [
    function ({ addUtilities, addComponents, addBase, addVariant, e, prefix, theme, variants, config }) {
      // prefix: className 经过 config.prefix 处理
      // e: className 经过 escaping string 转译，如 hover\:border-box
      // const colors = theme('colors', {});
      // const variants = theme('variants', {});
      // This function is your plugin

      // 增加伪类
      ['before', 'after'].map(function (variant) {
        addVariant(variant, ({ modifySelectors, separator }) => {
          modifySelectors(({ className }) => {
            return `.${e(`${variant}${separator}${className}`)}:${variant}`
          })
        })
      });
      // 例如：!absolute
      addVariant('important', ({ container }) => {
        container.walkRules(rule => {
          rule.selector = `.\\!${rule.selector.slice(1)}`
          rule.walkDecls(decl => {
            decl.important = true
          })
        })
      })

      const borderSizing = {
        '.border-sizing': {
          boxSizing: 'border-box',
        },
      }
      addUtilities(borderSizing, {
        variants: ['before', 'after'],
      })

      const pingCenter = {
        '.pin-center': {
          top: '50%',
          left: '50%',
          transform: 'translateY(-50%) translateX(-50%)'
        }
      }
      addUtilities(pingCenter, {})
      /* const component = {
        '@variants responsive, hover': {
          '.border-box': {
            borderBox: 'border-box',
          },
        },
        '.border-box': {
          borderBox: 'border-box',
        },
      }
      addComponents([component], {
        respectPrefix: false,
      }); */
    },
  ],
  prefix: '',
  important: false,
  separator: ':',
  corePlugins: {
    preflight: false,
  },
}