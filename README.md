[![Build status](https://github.com/notaphplover/axel/workflows/ci/badge.svg)](https://github.com/notaphplover/axel/workflows/ci/badge.svg)

# Axel

The not-an-mtg-engine open project! (In progress)

## Status of the project

This project was born as a test to try new software architecture approaches DDD based.

This project is now a WIP with no roadmap, so ***don't put your faith in it*** (for now).

## Getting started

1. Clone the repo.
2. Install the dependencies:

```
npm ci
```

3. Run the setup script

```
npm run setup:local:ts
```

4. Build the source code:

```
npm run build
```

5. Launch docker images:

```
docker-compose up
```

6. Start local server

```
npm run start
```

7. Enjoy!

### Tests

Tests can be passed with the test script

```
npm t
```

***Note***: Non unit tests may require all the docker images up

```
npm run docker:up:test
```
