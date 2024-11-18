module.exports = {
  extends: ['ali/vue', 'plugin:prettier/recommended'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
      },
    },
  },
  rules: {
    'no-console': 0,
  },
};
