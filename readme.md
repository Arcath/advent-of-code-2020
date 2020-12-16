# Advent of Code 2020

![Tests CI](https://github.com/Arcath/advent-of-code-2020/workflows/Tests%20CI/badge.svg)

My solutions to the Advent of Code 2020 puzzles.

Install dependencies through npm.

```
npm install
```

## Running a puzzle

```
npm run puzzle -- XX
```

Where XX is the puzzle number e.g. `01`.

Puzzle output is as follows

 - 01 - 02 - Console
 - 03 - Console & screen-X.gif
 - 04 - 15 - Console

## Tests

```
npm test
```

This will run jest for all puzzles. The tests run with the example data in the puzzles to ensure that the solution operates (at least in principle) as the puzzle requires.

```
npm test -- XX
```

This will run jest for the given day where XX is the puzzle number e.g. `01`.