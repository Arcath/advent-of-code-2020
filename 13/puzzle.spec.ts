import {parseBusLine, findFirstBus, findSequence} from './puzzle'

const SAMPLE = `939
7,13,x,x,59,x,31,19`

describe('Day 13', () => {
  it('should solve part 1', () => {
    const [ts, busLine] = SAMPLE.split(/\n/)

    const currentTime = parseInt(ts)

    const busses = parseBusLine(busLine)

    expect(currentTime).toBe(939)
    expect(busses.length).toBe(5)

    const first = findFirstBus(currentTime, busses)

    expect(first.bus).toBe(59)
    expect(first.time).toBe(5)
  })

  it('should solve part 2', () => {
    const result = findSequence(`17,x,13,19`)

    expect(result).toBe(BigInt(3417))
  })
})