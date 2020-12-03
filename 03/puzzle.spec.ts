import {puzzle} from './puzzle'

const SAMPLE = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`

describe('Day 3', () => {
  it('should pass part 1', async () => {
    const trees = await puzzle(SAMPLE.split(`\n`), 3, 1)

    expect(trees).toBe(7)
  })

  it('should pass day 2', async () =>{
    const rows = SAMPLE.split(`\n`)

    const trees = [
      await puzzle(rows, 1, 1),
      await puzzle(rows, 3, 1),
      await puzzle(rows, 5, 1),
      await puzzle(rows, 7, 1),
      await puzzle(rows, 1, 2)
    ].reduce((count, n) => {
      return count * n
    })

    expect(trees).toBe(336)
  })
})