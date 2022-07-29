# Treat

Introduction

## Overview

This project currently consists of the following container:

- Frontend React (Node)
  - packages/webapp
  - http://localhost:3000/
- Backend Express (Node)
  - packages/backend
  - http://localhost:5000/

## Requirements

- Node >= 16.9

## Installation

The first step is to get your node sources and build all dependency libraries.

1. `yarn install`
2. `yarn build:lib`
3. Go into ./packages/backend, create file `.env`, and insert content of `.env.example`.
4. Go into ./packages/webapp, create file `.env`, and insert content of `.env.example`.

### Start application

1. Go to root directory `treating`
2. Run `yarn start:all` to start both backend and webapp

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
