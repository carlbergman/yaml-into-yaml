const fs = require('fs');
const YAML = require('js-yaml');
const traverse = require('traverse');

const readYaml = (path, encoding = 'utf-8') => YAML.safeLoad(fs.readFileSync(path, { encoding }));

const writeYaml = (path, data) => fs.writeFileSync(path, YAML.safeDump(data));

const fileExistsOrThrow = (path) => {
  const exists = fs.existsSync(path);
  if (exists === false) {
    throw new Error(`${path} not found`);
  }
}

const selectorExistsOrThrow = (needle, haystack, haystackName) => {
  if (traverse(haystack).has(needle) === false) {
    throw new Error(`${needle} not found in ${haystackName}`);
  }
}

const insertObjectIntoObject = (base, mixin, selector) => {
  const result = traverse(base).clone();

  traverse(result).set(selector, mixin);

  return result;
};

module.exports = {
  fileExistsOrThrow,
  insertObjectIntoObject,
  readYaml,
  selectorExistsOrThrow,
  writeYaml,
};
