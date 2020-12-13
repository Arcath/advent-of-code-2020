import {runInstructions, rotate, runWaypointInstructions} from './puzzle'

describe('Day 12', () => {
  it('should solve part 1', () => {
    const inst = ['F10', 'N3', 'F7', 'R90', 'F11']

    const {x, y} = runInstructions(inst)

    expect(x).toBe(17)
    expect(y).toBe(-8)

  })

  it('should solve part 2', () => {
    const {x, y} = rotate(2, 1, 90)

    expect(x).toBe(-1)
    expect(y).toBe(2)

    const inst = ['F10', 'N3', 'F7', 'R90', 'F11']

    const endpoint = runWaypointInstructions(inst)

    expect(endpoint.x).toBe(214)
    expect(endpoint.y).toBe(-72)
  })
})