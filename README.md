# Search.js

Search.js is a light weight, easy-to-use, and embedded search engine module to filter elements from a search request as input.

## GETTING STARTED

To install search.js package, inside your node project run command `npm install --save search.js`

Create a configuration file by following this format. Then :

```js
const search = require('search.js')(config);
const filteredElements = search('{input}', {elements}[]);
```

## Configuration

The configuration is used to specify search engine caracteristics (wich algorithm to use, how to use them etc.) and to specify how to filter your elements.

**Exemple:**

Let's say we want to filter articles with a title, an author, a publication date, a description and some content.

```js
const elementsToFilter = [
  {
    title: "Search.js is AWESOME",
    author: "Paulo de la Montana",
    publicationDate: "10/12/2019",
    description: "Here is an article about the awesome search.js",
    content:
      "Veniam magna est ipsum elit aliqua deserunt adipisicing eu ipsum incididunt sint ut. Occaecat et nulla anim sunt velit laborum mollit dolore. Nostrud nisi culpa commodo ullamco qui. Deserunt est adipisicing aute id. Id sunt adipisicing amet incididunt ea quis sint mollit qui."
  },
  {
    title: "Second article",
    author: "El quadrador de Dali",
    publicationDate: "22/11/2019",
    description: "Description of the second article",
    content:
      "Nostrud eu cillum enim nulla proident commodo commodo laborum est nostrud proident tempor fugiat officia. Nisi dolor consequat labore adipisicing culpa magna. Nostrud do id amet est Lorem. Veniam qui amet proident aute sunt et adipisicing et eu incididunt eu laboris dolor consectetur."
  },
  {
    title: "Third article",
    author: "Los chicos de San Diago",
    publicationDate: "11/11/2019",
    description: "Description of the third article",
    content:
      "Veniam aute laborum veniam eiusmod consequat occaecat eiusmod sit proident. Eu dolore proident minim non commodo ad et enim duis irure adipisicing. Magna velit nostrud non laborum proident et adipisicing reprehenderit sunt nisi laborum dolore qui et."
  },
  {
    title: "Last article",
    author: "El maestro con no nombre",
    publicationDate: "02/02/2019",
    description: "Description of the last article",
    content:
      "Ad tempor non est aliquip excepteur proident fugiat amet mollit aliquip. Proident qui do aliquip ex culpa sint ea ea ullamco consequat adipisicing voluptate. Aliqua ad incididunt ullamco laboris adipisicing irure velit nisi esse ullamco amet in adipisicing dolore."
  }
];
```

To configure the search algorithm, what you first need to do is to initialize search.js module from a configuration file

```js
const searchConfiguration = {
  properties: {
    title: {
      weight: 1
    },
    author: 2,
    publicationDate: {
      weight: 4
    },
    description: 3,
    content: 4
  }
};
```

A random user il looking for an article without axactly knowing all its informations and try to find it by making an approximative research as follow.

```js
const searchInput = " Paulo Montana awesome";
const elementsFiltered = search(searchInput, elementsToFilter);
```
