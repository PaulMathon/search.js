/**
 * Verify that the given configuration has a valid format
 * @param config {object} - The verified configuration
 * @returns {Promise} - resolve: true | reject: { error, message }
 */
module.exports = function fillConfiguration(config) {
  if (!config) {
    return {
      error: "ContextError",
      message: `No configuration has been provided`
    };
  }
  let filledConfig = config;
  if (typeof filledConfig !== "object") {
    return {
      error: "ContextError",
      message: `The given configuration should be an object but got ${typeof filledConfig}`
    };
  }
  if (!filledConfig.properties) {
    return {
      error: "ContextError",
      message:
        'The configuration must provide a "properties" attribute containing all the element to search.'
    };
  }
  const { properties } = filledConfig;
  if (typeof properties !== "object") {
    return {
      error: "ContextError",
      message: `Configuration's "properties" attribute should be an array but got ${typeof properties}`
    };
  }
  for (let property in properties) {
    const spec = properties[property];
    if (typeof spec === "object") {
      const { weight } = spec;
      if (weight) {
        if (typeof weight !== "number") {
          if (typeof weight === "string") {
            try {
              filledConfig.properties[property].weight = parseInt(weight);
            } catch (err) {
              return {
                error: "ContextError",
                message: `Index ${property}'s "weight" attribute should be a number of type number or a parsable string but got ${importance}`
              };
            }
          }
        }
      } else {
        return {
          error: "ContextError",
          message: `If you choose to set the value of a property as an object you must provide the "weight" attribute`
        };
      }
    } else if (typeof spec === "number") {
      if (spec < 0) {
        return {
          error: "ContextError",
          message: `Configuration's "properties" should be setted with a number greater than 0 but got ${value} for ${property}`
        };
      }
      filledConfig.properties[property] = { weight: spec };
    } else {
      return {
        error: "ContextError",
        message: `Configuration's "properties" for ${property} attribute should contain elements of type object or number but got ${typeof value}.`
      };
    }
  }
  filledConfig.properties = normalizeWeights(filledConfig.properties);
  return filledConfig;
};

function normalizeWeights(properties) {
  let normalizedWeights = properties;
  const sumWeight = Object.keys(properties).reduce(
    (sum, property) => sum + properties[property].weight,
    0
  );
  Object.keys(normalizedWeights).forEach(property => {
    normalizedWeights[property].weight = roundDecimal(
      normalizedWeights[property].weight / sumWeight,
      2
    );
  });
  return normalizedWeights;
}

function roundDecimal(number, nbDecimals) {
  return (
    Math.round((number + Number.EPSILON) * 10 ** nbDecimals) / 10 ** nbDecimals
  );
}
