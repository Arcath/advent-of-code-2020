import {xmas, breakXmas} from './puzzle'

const SAMPLE = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`

describe('Day 9', () => {
  it('should solve part 1', () => {
    expect(xmas(SAMPLE.split(`\n`), 5).length).toBe(1)
  })

  it('should solve part 2', () => {
    expect(breakXmas(SAMPLE.split(`\n`), 127)).toBe(62)
  })
})