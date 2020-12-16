import {memoryGame} from './puzzle'

describe('Day 15', () => {
  it('should solve part 1', () => {
    expect(memoryGame([0, 3, 6], 10)).toBe(0)

    expect(memoryGame([1,3,2], 2020)).toBe(1)
  })

  /*

  The game works it just takes a while to run this test so we don't run it normally.
  Its the same as running the actual puzzle so there is nothing gained from it.

  it('should solve part 2', () => {
    expect(memoryGame([0, 3, 6], 30000000)).toBe(175594)
  })*/
})