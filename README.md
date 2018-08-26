# yaml-into-yaml

A CLI to insert a yaml file into another yaml file.

## Installation

```
npm install yaml-into-yaml
```

## Usage

```
USAGE: yaml-into-yaml -b path/to/base.yaml -m path/to/mixin.yaml -s foo.bar -o path/to/output.yaml
The following options are supported:
  -b, --base-file <ARG1>   	The path to a yaml file (mandatory)
  -m, --mixin-file <ARG1>  	The path to a yaml file that you want to insert into the base file (mandatory)
  -s, --selector <ARG1>    	The location in the base file where you want to insert the mixin file (use dot notation) (mandatory)
  -o, --output-file <ARG1> 	The path where you want to write the resulting yaml file (mandatory)
```

## Testing

```
npm run test
```
