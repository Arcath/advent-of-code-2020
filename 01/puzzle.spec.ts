import {puzzle} from './puzzle'

const SAMPLE = [1721, 979, 366, 299, 675, 1456]

describe('Day 1', () => {
  it('should pass part 1', () => {
    const result = puzzle(SAMPLE)

    expect(result.two).toStrictEqual([1721, 299, 514579])
  })

  it('should pass part 2', () => {
    const result = puzzle(SAMPLE)

    expect(result.three).toStrictEqual([979, 366, 675, 241861950])
  })
})