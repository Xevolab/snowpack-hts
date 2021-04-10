/**
 * @Author: francesco
 * @Date:   2021-04-08T22:48:51+02:00
 * @Last edit by: francesco
 * @Last edit at: 2021-04-09T20:08:13+02:00
 */

module.exports = {
  mount: {
    "src": "/"
  },

  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
  },
  plugins: [
    [
      '@snowpack/plugin-sass',
      {
        style: 'compressed'
      }
    ]
  ]
};
