const fillConfiguration = require("../src/core/config");
const { expect } = require("chai");

describe("CONFIGURATION :", () => {
  afterEach(() => (filledConfig = undefined));
  it("Succeeds with a valid configuration.", () => {
    const validConfig = {
      properties: {
        title: { weight: 4 },
        author: 3,
        publicationDate: { weight: 1 },
        description: 2,
        content: 1
      }
    };
    const filledConfig = fillConfiguration(validConfig);
    const expectedConfig = {
      properties: {
        title: { weight: 0.36 },
        author: { weight: 0.27 },
        publicationDate: { weight: 0.09 },
        description: { weight: 0.18 },
        content: { weight: 0.09 }
      },
      algorithm: "include",
      threshold: 0
    };
    expect(filledConfig).to.be.deep.equal(expectedConfig);
  });

  it("Fails with a wrong type configuration.", () => {
    const wrongTypeConfig = "The config shouldn't be a string";
    const filledConfig = fillConfiguration(wrongTypeConfig);
    const expectedError = {
      error: "ConfigError",
      message: `The given configuration should be an object but got ${typeof wrongTypeConfig}`
    };
    expect(filledConfig).to.be.deep.equal(expectedError);
  });
});
