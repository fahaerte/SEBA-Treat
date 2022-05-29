# Treat

Introduction

## Overview

This project currently consists of the following container:

- Frontend Customer React (Node)
  - packages/webapp-customer
  - http://localhost:3000/

## Requirements

- Node >= 16.9

## Installation

The first step is to get your node sources and build all dependency libraries.

1. `yarn install`
2. `yarn build:lib`


### Backend

### Frontend

See further instructions [webapp README](packages/webapp/README.md)

1. all steps from backend-development
2. run yarn to start react node app

## Further Scripts

```bash
  yarn build:all    # build all packages
  yarn build:lib    # build dependency libs
  yarn lint         # run linter for .ts,.tsx files
```

`yarn test:all`

`yarn start:all`

`yarn format`

`yarm format:check`
