module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',

    // import resolution of TS modules
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'no-console': 'off',

    'no-unused-expressions': [2, {
      allowShortCircuit: true,
      allowTernary: true,
    }],

    'react/prop-types': 'off',

    'jsx-a11y/label-has-associated-control': [2, {
      controlComponents: ['InputNumber'],
      depth: 3,
    }],

    'react/jsx-props-no-spreading': 'off',

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',

    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],

    // fix base no-shadow bug
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],

    // no need to include extension when importing `.ts` and `.tsx` files
    'import/extensions': ['error', 'ignorePackages', {
      ts: 'never',
      tsx: 'never',
    }],

    // allow JSX in `.tsx` files
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
  },
};
