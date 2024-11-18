module.exports = {
  fix: false,
  defaultSeverity: 'warning',
  extends: [
    'stylelint-config-ali',
    'stylelint-prettier/recommended',
    'stylelint-config-property-sort-order-smacss',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'order/order': [
      [
        'dollar-variables',
        'at-variables',
        'custom-properties',
        'at-rules',
        'declarations',
        {
          type: 'at-rule',
          name: 'supports',
        },
        {
          type: 'at-rule',
          name: 'media',
        },
        'rules',
      ],
      {
        severity: 'warning',
        disableFix: true,
      },
    ],
  },
};
