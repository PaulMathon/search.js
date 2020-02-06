module.exports = function search(config) {
  return (elements, searchInput) => {
    const elementsScore = getElementsScore(elements, searchInput, config);
    const searchResult = orderElements(elements, elementsScore);
    return searchResult;
  };
};

function getElementsScore(elements, searchInput, config) {
  const searchAlgorithm = getSearchAlgorithm(config.algorithm);
  const elementsToMap = JSON.parse(JSON.stringify(elements));
  return elementsToMap.map(element => {
    Object.keys(element).forEach(attribute => {
      element[attribute] = searchAlgorithm(element[attribute], searchInput);
    });
    return reduceElementScore(element, config);
  });
}

function reduceElementScore(element, config) {
  const properties = Object.keys(config.properties);
  return Object.keys(element).reduce((score, attribute) => {
    if (properties.includes(attribute)) {
      return score + element[attribute];
    }
    return score;
  }, 0);
}

function getSearchAlgorithm(algorithm) {
  const algorithms = {
    include: includeAlgorithm
  };
  return algorithms[algorithm];
}

/**
 * If a string includes the search input, then score = 1, if not score = 0.
 * @param {String} searchInput
 * @param {Array} elements
 */
function includeAlgorithm(sentence, searchInput) {
  if (typeof sentence === "string" && sentence.includes(searchInput)) {
    return 1;
  }
  return 0;
}

function orderElements(elements, elementsScore) {
  const scores = handleSameScores(elementsScore);
  const orderedElements = [];
  const elementsLength = elements.length;
  while (orderedElements.length < elementsLength) {
    const index = scores.indexOf(Math.max(...elementsScore));
    scores[index] = 0;
    orderedElements.push(elements[index + orderedElements.length]);
  }
  return orderedElements;
}

function handleSameScores(scores) {
  const managedScores = [];
  scores.forEach(score => {
    while (managedScores.includes(score)) {
      score = score - Number.EPSILON;
    }
    return managedScores.push(score);
  });
  return managedScores;
}
