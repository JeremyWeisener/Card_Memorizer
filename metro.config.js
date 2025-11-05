// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    // Use the Expo version of the SVG transformer
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
  };
  config.resolver = {
    ...resolver,
    // Exclude .svg from asset extensions
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    // Add .svg to source code extensions
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return config;
})();