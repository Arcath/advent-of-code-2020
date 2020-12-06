import {countAllAnswers, countAnswers} from './puzzle'

const SAMPLE = `abc

a
b
c

ab
ac

a
a
a
a

b`

describe('Day 6', () => {
  it('should solve part 1', () => {
    const count = countAnswers(SAMPLE.split(`\n\n`))

    expect(count).toBe(11)
  })

  it('should solve part 2', () => {
    const count = countAllAnswers(SAMPLE.split(`\n\n`))

    expect(count).toBe(6)
  })
})