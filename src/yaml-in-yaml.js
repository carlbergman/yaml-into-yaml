const helpers = require('./helpers');

const yamlInYaml = (baseFile, mixinFile, selector, outputFile) => {
  helpers.fileExistsOrThrow(baseFile);
  helpers.fileExistsOrThrow(mixinFile);

  const baseYaml = helpers.readYaml(baseFile);
  const mixinYaml = helpers.readYaml(mixinFile);

  const selectorAsArray = selector.split('.');

  helpers.selectorExistsOrThrow(selectorAsArray, baseYaml, baseFile);

  const outputYaml = helpers.insertObjectIntoObject(baseYaml, mixinYaml, selectorAsArray);

  helpers.writeYaml(outputFile, outputYaml);
};

module.exports = yamlInYaml;
