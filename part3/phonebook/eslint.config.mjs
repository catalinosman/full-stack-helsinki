import globals from "globals";
import stylisticJs from "@stylistic/eslint-plugin-js";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
    },
    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": "off",
    },
  },
  {
    ignores: ["frontend/**", "build/**"],
  },
];
