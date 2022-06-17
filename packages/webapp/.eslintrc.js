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
};
