module.exports = {
  ignorePatterns: ['public'],
  env: {
    browser: true,
    node: false,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      plugins: ['react', 'react-hooks', '@typescript-eslint'],
      extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
      settings: {
        react: {
          pragma: 'React',
          version: 'detect',
        },
      },
      rules: {
        'react/jsx-key': 'warn',
        'react/no-unescaped-entities': 'warn',
        'react-hooks/rules-of-hooks': 'warn',
        'react-hooks/exhaustive-deps': 'warn',
      },
    },
  ],
};
