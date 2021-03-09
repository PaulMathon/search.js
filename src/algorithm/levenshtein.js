/**
 * Compute Levenshtein Distance.
 * @param {string} string1 the first string to compare.
 * @param {string} string2 the second string to compare.
 * @returns {number} the similarity score, aka Levenshtein Distance.
 */
function levenshteinAlgorithm(string1, string2) {
  const matrix = [];
  let i; // iterates through string1
  let j; // iterates through string2
  let cost; // cost

  // Step 1 : example : string1 = case ; string2 = as
  const n = string1.length;
  const m = string2.length;

  if (n == 0) return m;
  if (m == 0) return n;

  // Step 2 : initialize matrix
  //    c  a  s  e
  // a  0  1  2  3
  // s  1  0  0  0
  for (i = 0; i <= m; i++) {
    matrix[i] = [i];
  }
  for (j = 0; j <= n; j++) {
    matrix[0][j] = j;
  }
  // Step 3 : iterate through lines
  for (i = 1; i <= m; i++) {
    // Step 4 : iterate through columns
    for (j = 1; j <= n; j++) {
      // Step 5
      if (string1.charAt(i - 1) == string2.charAt(j - 1)) {
        cost = 0;
      } else {
        cost = 1;
      }
      // Step 6
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  // Step 7
  return matrix[n][m];
}

module.exports = levenshteinAlgorithm;
