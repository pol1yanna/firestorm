module.exports = {
    root: true,
    env: {
      node: true,
      jest: true,
    },
  
    parser: '@typescript-eslint/parser',
  
    parserOptions: {
      project: 'tsconfig.json',
      sourceType: 'module',
    },
  
    plugins: ['@typescript-eslint/eslint-plugin'],
  
    extends: ['airbnb-typescript/base', 'prettier'],
  
    rules: {
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
    },
  
    ignorePatterns: ['.eslintrc.js'],
  };
  