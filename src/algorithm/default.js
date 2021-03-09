/**
 * If a string includes the search input, then score = 1, if not score = 0.
 * @param {string} string1 a phrase we want to compute similarity with.
 * @param {array} string2 The search string
 * @returns {number} The similarity score.
 */
function defaultAlgorithm(string1, string2) {
  const successScore = 1;
  const failureScore = 0;
  score =
    typeof string1 === "string" && string1.includes(string2)
      ? successScore
      : failureScore;
  if (string1.indexOf(string2) == 0) {
    score *= 2;
  }
  return score;
}

module.exports = defaultAlgorithm;
