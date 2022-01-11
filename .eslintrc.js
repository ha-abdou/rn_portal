module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', '@react-native-community', 'prettier'],
  rules: {
    semi: [2, 'never'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': [
      2,
      {
        'ts-ignore': 'allow-with-description',
      },
    ],
    'no-void': 'off',
    'react/react-in-jsx-scope': 0,
    'react/jsx-uses-react': 0,
  },
}
