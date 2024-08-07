module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [["inline-import", { extensions: [".sql"] }]],
    assumptions: {
      setPublicClassFields: false,
      privateFieldsAsSymbols: true,
    },
  };
};
