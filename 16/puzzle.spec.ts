import {parseInput} from './puzzle'

const SAMPLE = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`

const SAMPLE_2 = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`

describe("Day 16", () => {
  it('should solve part 1', () => {
    const lines = SAMPLE.split(`\n`)

    const {invalidSum, validTickets} = parseInput(lines)

    expect(invalidSum).toBe(71)
    expect(validTickets).toBe(1)
  })

  it('should solve part 2', () => {
    const lines = SAMPLE_2.split(`\n`)

    parseInput(lines)
  })
})