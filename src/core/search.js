/**
 * Retrieve the choosen search algorithm according to the configuration.
 * @param {String} algorithm eanc
 * @returns {Function} The search algorithm that will compute the similarity score.
 */
function getSearchAlgorithm(algorithm) {
  const algorithms = {
    include: require("../algorithm/default"),
    levenshtein: require("../algorithm/levenshtein"),
  };
  return algorithms[algorithm];
}

/**
 * Sort an array of elements to their "score" attribute.
 * @param {array} elements The array that will be sorted.
 * @returns {array} The sorted array.
 */
function orderElements(elements) {
  return elements.sort((el1, el2) => {
    return el2.score - el1.score;
  });
}

/**
 * Compute a score for each element to filter in the array.
 * @param {array} elements
 * @param {string} searchInput
 * @param {object} config
 */
function getElementsScore(elements, searchInput, config) {
  const properties = Object.keys(config.properties);
  const searchAlgorithm = getSearchAlgorithm(config.algorithm);
  elements.forEach((element) => {
    let score = 0;
    Object.keys(element).forEach((attribute) => {
      if (properties.includes(attribute)) {
        const { weight } = config.properties[attribute];
        score += weight * searchAlgorithm(element[attribute], searchInput);
      }
    });
    element.score = score;
  });
  return elements;
}

module.exports = function search(config) {
  return (elements, searchInput) => {
    const elementsScore = getElementsScore(elements, searchInput, config);
    const searchResult = orderElements(elementsScore);
    return searchResult;
  };
};
