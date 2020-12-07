import {parseRules, findIndexesForBag, countContains} from './puzzle'

const SAMPLE = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`

describe("Day 7", () => {
  it('should solve part 1', () => {
    const rules = parseRules(SAMPLE.split(/\n/))

    expect(rules.all().length).toBe(9)

    const lr = rules.lookup('light red')

    expect(lr.children.length).toBe(2)

    const indexes = findIndexesForBag('shiny gold', rules)

    expect(indexes.length).toBe(4)
  })

  it('should solve part 2', () => {
    const rules = parseRules(SAMPLE.split(/\n/))

    expect(rules.all().length).toBe(9)

    const count = countContains('shiny gold', rules)

    expect(count).toBe(32)
  })
})