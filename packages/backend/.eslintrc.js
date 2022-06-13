module.exports = {
  extends: "../../eslintrc.ts.react.base.json",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  overrides: [
    {
      files: ["demo/**/*.ts", "demo/**/*.tsx"],
      extends: "../../eslintrc.ts.react.base.json",
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.demo.json"],
      },
    },
    {
      files: ["test/**/*.ts", "test/**/*.tsx"],
      extends: "../../eslintrc.ts.react.jest.base.json",
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./test/tsconfig.json"],
      },
    },
    {
      files: ["webpack.config.ts", "webpack.config.umd.ts"],
      extends: "../../eslintrc.ts.base.json",
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.webpack.json"],
      },
    },
  ],
  rules: {
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-explicit-any": "off"
  },
};
