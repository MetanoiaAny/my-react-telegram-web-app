export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: 750,
      viewportUnit: "vw",
      fontViewportUnit: "vw",
      exclude: [/node_modules\/react-vant/i]
    },
  }
}
