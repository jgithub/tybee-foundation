// eslint.config.js

// https://typescript-eslint.io/
// https://eslint.org/docs/latest/use/configure/configuration-files#using-predefined-configurations
// https://eslint.org/docs/latest/use/configure/migration-guide#importing-plugins-and-custom-parsers
// https://eslint.org/docs/latest/use/configure/migration-guide#using-eslintrc-configs-in-flat-config
// https://eslint.org/docs/latest/use/configure/migration-guide#predefined-and-shareable-configs

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from "globals";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    files: ["**/*.ts"],
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "eqeqeq": "error",
      "no-irregular-whitespace": "error",
      "indent": ['error', 2]
    }
  }
);

