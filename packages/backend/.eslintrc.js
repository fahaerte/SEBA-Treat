module.exports = {
  extends: "../../eslintrc.ts.react.base.json",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  overrides: [
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
    "@typescript-eslint/no-explicit-any": "off",
  },
};
