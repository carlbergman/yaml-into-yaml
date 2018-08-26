# yaml-in-yaml

A CLI to insert a yaml file into another yaml file.

## Installation

```
npm install yaml-in-yaml
```

## Usage

```
yaml-in-yaml --base-file a.yaml --mixin-file b.yaml --selector foo.bar --output-file c.yaml
```

### Paramters

* `--base-file`: A yaml file.
* `--mixin-file`: A yaml file that you want to insert into the base file.
* `--selector`: The location in the base file where you want to insert the mixin file. Use dot notation.
* `--output-file`: The location and file name of the resulting yaml file.

## Testing

```
npm run test
```
