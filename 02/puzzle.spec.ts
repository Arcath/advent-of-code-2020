import {part1, part2} from './puzzle'

const SAMPLE =[
  '1-3 a: abcde',
  '1-3 b: cdefg',
  '2-9 c: ccccccccc'
]

describe('Day 2', () => {
  it('should pass day 1', () => {
    const valid = part1(SAMPLE)

    expect(valid).toBe(2)
  })

  it('should pass part 2', () => {
    const valid = part2(SAMPLE)

    expect(valid).toBe(1)
  })
})