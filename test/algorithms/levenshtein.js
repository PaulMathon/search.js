const computeLenshteinDistance = require('../../src/algorithm/levenshtein');

describe('ALGORITHMS : LEVENSHTEIN :', () => {
  it('Highest score', () => {
    const score = computeLenshteinDistance('bla', 'bla');
    console.log('score', score);
  })
});