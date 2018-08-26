#!/usr/bin/env node

const stdio = require('stdio');
const { insertYamlIntoYaml } = require('./helpers');

const ops = stdio.getopt({
  'base-file': {
    key: 'b',
    args: 1,
    description: 'The path to a yaml file',
    mandatory: true,
  },
  'mixin-file': {
    key: 'm',
    args: 1,
    description: 'The path to a yaml file that you want to insert into the base file',
    mandatory: true,
  },
  selector: {
    key: 's',
    args: 1,
    description: 'The location in the base file where you want to insert the mixin file (use dot notation)',
    mandatory: true,
  },
  'output-file': {
    key: 'o',
    args: 1,
    description: 'The path where you want to write the resulting yaml file',
    mandatory: true,
  },
}, 'yaml-into-yaml -b path/to/base.yaml -m path/to/mixin.yaml -s foo.bar -o path/to/output.yaml');

try {
  insertYamlIntoYaml(ops['base-file'], ops['mixin-file'], ops.selector, ops['output-file']);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
