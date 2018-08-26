const fs = require('fs');
const YAML = require('js-yaml');
const traverse = require('traverse');

const readYaml = (path, encoding = 'utf-8') => YAML.safeLoad(fs.readFileSync(path, { encoding }));

const writeYaml = (path, data) => fs.writeFileSync(path, YAML.safeDump(data));

const selectorExistsOrThrow = (needle, haystack, haystackName) => {
  if (traverse(haystack).has(needle) === false) {
    throw new Error(`${needle.join('.')} not found in ${haystackName}`);
  }
};

const insertObjectIntoObject = (base, mixin, selector) => {
  const result = traverse(base).clone();
  traverse(result).set(selector, mixin);
  return result;
};

const insertYamlIntoYaml = (baseFile, mixinFile, selector, outputFile) => {
  const baseYaml = readYaml(baseFile);
  const mixinYaml = readYaml(mixinFile);

  const selectorAsArray = selector.split('.');

  selectorExistsOrThrow(selectorAsArray, baseYaml, baseFile);

  const outputYaml = insertObjectIntoObject(baseYaml, mixinYaml, selectorAsArray);

  writeYaml(outputFile, outputYaml);
};

module.exports = {
  insertObjectIntoObject,
  insertYamlIntoYaml,
  readYaml,
  selectorExistsOrThrow,
  writeYaml,
};
