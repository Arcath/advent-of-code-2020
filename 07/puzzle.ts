import {db, DB} from 'sodb'
import fs from 'fs'
import path from 'path'

const {readFile} = fs.promises

export const main = async () => {
  const INPUT = (await readFile(path.join(process.cwd(), '07', 'input.txt'))).toString()

  const rules = parseRules(INPUT.split(`\r\n`))

  const indexes = findIndexesForBag('shiny gold', rules)

  console.log(`Parents: ${indexes.length}`)

  const count = countContains('shiny gold', rules)

  console.log(`Contains: ${count}`)
}


interface Rule{
  bag: string
  children: [number, string][]
}

export const parseRules = (rules: string[]) => {
  const data = db<Rule>([], {
    index: 'bag'
  })

  const {add} = data

  rules.forEach((rule) => {
    const bag = rule.match(/^([a-z\s]*?) ba/)[1]
    const children: Rule["children"] = []

    const [, rawBags] = rule.split(' contain ')

    if(rawBags !== "no other bags."){
      const bags = rawBags.split(", ")

      bags.forEach((b) => {
        const m = b.match(/([0-9]) ([a-z\s]*?) ba/)

        children.push([parseInt(m[1]), m[2]])
      })
    }
    
    add({bag, children})
  })

  return data
}

export const findIndexesForBag = (bag: string, data: DB<Rule>): string[] => {
  const rules = data.where({children: (entry) => {
    const bags = entry.children.map((c) => c[1])

    return bags.includes(bag)
  }})
  const indexes: string[] = []

  rules.forEach((rule) => {
    if(!indexes.includes(rule.bag)){
      indexes.push(rule.bag)

      const parents = findIndexesForBag(rule.bag, data)
      parents.forEach((parent) => {
        if(!indexes.includes(parent)){
          indexes.push(parent)
        }
      })
    }
  })

  return indexes
}

export const countContains = (bag: string, data: DB<Rule>): number => {
  const rule = data.lookup(bag)

  return rule.children.reduce((c, [n, b]) => {
    return c + n + (n * countContains(b, data))
  }, 0)
}