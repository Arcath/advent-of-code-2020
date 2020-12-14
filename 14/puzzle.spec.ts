import {initialize, initializeMemoryLocs} from './puzzle'

const SAMPLE = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`

const SAMPLE_2 = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`

describe('Day 14', () => {
  it('should solve part 1', () => {
    const mem = initialize(SAMPLE.split(`\n`))

    const total = mem.reduce((c, n) => c + n)

    expect(total).toBe(BigInt(165))
  })

  it('should solve part 2', () => {
    const mem = initializeMemoryLocs(SAMPLE_2.split(`\n`))

    const total = mem.reduce((c, n) => c + n)
    
    expect(total).toBe(BigInt(208))
  })
})