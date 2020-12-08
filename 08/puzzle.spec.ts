import {findInfinateLoopOrFinish, fixCode} from './puzzle'

const SAMPLE = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`

describe('Day 8', () => {
  it('should solve part 1', () => {
    expect(findInfinateLoopOrFinish(SAMPLE.split(`\n`)).acc).toBe(5)
  })

  it('should solve part 2', () => {
    expect(fixCode(SAMPLE.split(`\n`))).toBe(8)
  })
})