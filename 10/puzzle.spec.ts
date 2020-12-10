import {joltage, arrangements} from './puzzle'

const SAMPLE_1 = `16
10
15
5
1
11
7
19
6
12
4`

const SAMPLE_2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`

describe('Day 10', () => {
  it('should solve part 1 for SAMPLE_1', () => {
    const result = joltage(SAMPLE_1.split(`\n`).map((n) => parseInt(n)))

    expect(result.device).toBe(22)
    expect(result.diffs[1]).toBe(7)
    expect(result.diffs[3]).toBe(5)
  })

  it('should solve part 1 for SAMPLE_2', () => {
    const result = joltage(SAMPLE_2.split(`\n`).map((n) => parseInt(n)))

    expect(result.diffs[1]).toBe(22)
    expect(result.diffs[3]).toBe(10)
  })

  it('should solve part 2 for SAMPLE_1', () => {
    const count = arrangements(SAMPLE_1.split(`\n`).map((n) => parseInt(n)))

    expect(count).toBe(8)
  })

  it('should solve part 2 for SAMPLE_2', () => {
    const count = arrangements(SAMPLE_2.split(`\n`).map((n) => parseInt(n)))

    expect(count).toBe(19208)
  })
})