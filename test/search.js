const SearchEngine = require('../src/index');
const { expect } = require('chai');

describe('SEARCH :', () => {
  const configuration = {
    properties: {
      title: { weight: 4 },
      author: 3,
      publicationDate: { weight: 1 },
      description: 2,
      content: 1
    }
  };
  const elementsToFilter = [
    {
      title: 'Search.js is AWESOME',
      author: 'Paulo de la Montana',
      publicationDate: '10/12/2019',
      description: 'Here is an article about the awesome search.js blop',
      content:
        'Veniam magna est ipsum elit aliqua deserunt adipisicing eu ipsum incididunt sint ut. Occaecat et nulla anim sunt velit laborum mollit dolore. Nostrud nisi culpa commodo ullamco qui. Deserunt est adipisicing aute id. Id sunt adipisicing amet incididunt ea quis sint mollit qui.'
    },
    {
      title: 'Second article',
      author: 'El quadrador de Dali',
      publicationDate: '22/11/2019',
      description: 'Description of the second article',
      content:
        'Nostrud eu cillum enim nulla proident commodo commodo laborum est nostrud proident tempor fugiat officia. Nisi dolor consequat labore adipisicing culpa magna. Nostrud do id amet est Lorem. Veniam qui amet proident aute sunt et adipisicing et eu incididunt eu laboris dolor consectetur.'
    },
    {
      title: 'Third article',
      author: 'Los chicos de San Diago',
      publicationDate: '11/11/2019',
      description: 'Descriptio of the third article blop',
      content:
        'Veniam aute laborum veniam eiusmod consequat occaecat eiusmod sit proident. Eu dolore proident minim non commodo ad et enim duis irure adipisicing. Magna velit nostrud non laborum proident et adipisicing reprehenderit sunt nisi laborum dolore qui et.'
    },
    {
      title: 'Last article',
      author: 'El maestro con no nombre',
      publicationDate: '02/02/2019',
      description: 'Description of the last article',
      content:
        'Ad tempor non est aliquip excepteur proident fugiat amet mollit aliquip. Proident qui do aliquip ex culpa sint ea ea ullamco consequat adipisicing voluptate. Aliqua ad incididunt ullamco laboris adipisicing irure velit nisi esse ullamco amet in adipisicing dolore.'
    }
  ];
  const search = SearchEngine(configuration);
  it('Suceed', () => {
    const searchResult = search(elementsToFilter, 'Third');
    return expect(searchResult).not.to.be.undefined;
  });
});
