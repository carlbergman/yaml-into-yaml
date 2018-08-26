const { expect } = require('chai');
const { execFile } = require('child_process');
const helpers = require('../src/helpers');

describe('Insert yaml into yaml', () => {
  it('Should read, insert and write yaml', (done) => {
    execFile(
      './src/cli.js',
      [
        '-b',
        './test/test-files/base-file.yaml',
        '-m',
        './test/test-files/mixin-file.yaml',
        '-s',
        'base_a.base_aa',
        '-o',
        './test/test-files/output-file.yaml',
      ],
      (error) => {
        expect(error).to.equal(null);
        done();
      },
    );
  });

  describe('Parameters', () => {
    it('Base file should be mandatory', (done) => {
      execFile(
        './src/cli.js',
        [
          '-m',
          './test/test-files/mixin-file.yaml',
          '-s',
          'base_a.base_aa',
          '-o',
          './test/test-files/output-file.yaml',
        ],
        (error, stdout) => {
          expect(error).to.not.equal(null);
          expect(stdout).to.equal(
            'Missing "base-file" argument.\nTry "--help" for more information.\n',
          );
          done();
        },
      );
    });

    it('Mixin file should be mandatory', (done) => {
      execFile(
        './src/cli.js',
        [
          '-b',
          './test/test-files/base-file.yaml',
          '-s',
          'base_a.base_aa',
          '-o',
          './test/test-files/output-file.yaml',
        ],
        (error, stdout) => {
          expect(error).to.not.equal(null);
          expect(stdout).to.equal(
            'Missing "mixin-file" argument.\nTry "--help" for more information.\n',
          );
          done();
        },
      );
    });

    it('Selector should be mandatory', (done) => {
      execFile(
        './src/cli.js',
        [
          '-b',
          './test/test-files/base-file.yaml',
          '-m',
          './test/test-files/mixin-file.yaml',
          '-o',
          './test/test-files/output-file.yaml',
        ],
        (error, stdout) => {
          expect(error).to.not.equal(null);
          expect(stdout).to.equal(
            'Missing "selector" argument.\nTry "--help" for more information.\n',
          );
          done();
        },
      );
    });

    it('Output file should be mandatory', (done) => {
      execFile(
        './src/cli.js',
        [
          '-b',
          './test/test-files/base-file.yaml',
          '-m',
          './test/test-files/mixin-file.yaml',
          '-s',
          'base_a.base_aa',
        ],
        (error, stdout) => {
          expect(error).to.not.equal(null);
          expect(stdout).to.equal(
            'Missing "output-file" argument.\nTry "--help" for more information.\n',
          );
          done();
        },
      );
    });
  });

  describe('Helpers', () => {
    it('Should throw if selector not found', (done) => {
      execFile(
        './src/cli.js',
        [
          '-b',
          './test/test-files/base-file.yaml',
          '-m',
          './test/test-files/mixin-file.yaml',
          '-s',
          'foo.bar',
          '-o',
          './test/test-files/output-file.yaml',
        ],
        (error, stdout, stderr) => {
          expect(error).to.not.equal(null);
          expect(stderr).to.equal(
            'foo.bar not found in ./test/test-files/base-file.yaml\n',
          );
          done();
        },
      );
    });

    it('Should insert object into object', () => {
      const base = {
        foo: {
          bar: {},
        },
      };

      const mixin = {
        baz: {},
      };

      const expected = {
        foo: {
          bar: {
            baz: {},
          },
        },
      };

      expect(
        helpers.insertObjectIntoObject(base, mixin, ['foo', 'bar']),
      ).to.deep.equal(expected);
    });
  });
});
