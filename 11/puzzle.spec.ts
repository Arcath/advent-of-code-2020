import {parseMap, applyRules, findStable, EMPTY, OCCUPIED} from './puzzle'

const SAMPLE = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`

describe('Day 11', () => {
  it('should pass part 1', () => {
    const map = parseMap(SAMPLE)

    expect(map.length).toBe(10)
    expect(map[0].length).toBe(10)

    expect(map[0][0]).toBe(EMPTY)

    const newMap = applyRules(map)

    expect(newMap[0][0]).toBe(OCCUPIED)

    expect(findStable(map)).toBe(37)
  })
})