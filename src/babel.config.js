module.exports = {
  presets: [
    "@babel/preset-env", // To support modern JavaScript features
    "@babel/preset-typescript", // To support TypeScript
  ],
  plugins: [
    [
      "@babel/plugin-transform-modules-commonjs", // This plugin converts ESM to CommonJS
      {
        exclude: ["node_modules/axios"], // Exclude axios from this transformation
      },
    ],
  ],
};
