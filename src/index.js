const search = require("./core/search");
const fillConfiguration = require("./core/config");

module.exports = function SearchEngine(config) {
  const filledConfiguration = fillConfiguration(config);
  if (filledConfiguration.error) {
    return filledConfiguration;
  }
  return search(filledConfiguration);
};
