import {compute} from './compute'

describe('Compute', () => {
  it('should support, NOP JMP ACC', () => {
    const {get, runInstruction} = compute([
      'jmp +2',
      'nop +1',
      'acc +10',
      'jmp -2'
    ])

    expect(get('acc')).toBe(0)
    expect(get('ptr')).toBe(0)

    runInstruction()

    expect(get('ptr')).toBe(2)

    runInstruction()

    expect(get('acc')).toBe(10)

    runInstruction()

    expect(get('ptr')).toBe(1)
  })

  it('should end cleanly', () => {
    const {finished, runInstruction} = compute([
      `nop +1`,
      `jmp +1`,
      `acc +1`,
      `nop +1`
    ])

    runInstruction()

    expect(finished()).toBe(false)

    runInstruction()
    runInstruction()

    expect(finished()).toBe(false)
  })
})