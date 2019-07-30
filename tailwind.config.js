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
      }
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