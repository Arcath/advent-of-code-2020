import {db} from 'sodb'
import fs from 'fs'
import path from 'path'

const {readFile} = fs.promises

export const main = async () => {
  const INPUT = (await readFile(path.join(process.cwd(), '10', 'input.txt'))).toString()

  const numbers = INPUT.split(`\r\n`).map((n) => parseInt(n))

  const part1 = joltage(numbers)

  console.log(`Part 1: ${part1.diffs[1] * part1.diffs[3]}`)

  const part2 = arrangements(numbers)

  console.log(`Part 2: ${part2}`)
}


interface Entry{
  number: number
  minInput: number,
  maxInput: number
}

export const joltage = (adapters: number[]) => {
  let current = 0
  const diffs: {[diif: number]: number} = {}
  const used: number[] = [0]

  const {add, where} = db<Entry>()

  adapters.forEach((n) => {
    add({
      number: n,
      minInput: n - 3,
      maxInput: n - 1
    })
  })

  while(used.length !== adapters.length + 1){
    const max = used.sort((a,b) => a-b).reverse()[0]

    const numbers = where({number: (entry) => {
      return !used.includes(entry.number)
    }}, {minInput: {lte: max}}, {maxInput: {gte: max}})

    const number = numbers.sort((a, b) => {
      return a.number - b.number
    })[0].number

    const diff = number - max

    if(!diffs[diff]){
      diffs[diff] = 0
    }

    diffs[diff] += 1

    used.push(number)
    current = number
  }

  diffs[3] += 1

  return {
    device: current + 3,
    diffs
  }
}

interface OutputEntry extends Entry{
  outputs: number[]
  inputs: number[],
  maxOutput: number
  minOutput: number
}

export const arrangements = (adapters: number[]) => {
  const {add, where, all, update, lookup} = db<OutputEntry>([], {index: 'number'})

  add({
    number: 0,
    minInput: -10,
    maxInput: -10,
    minOutput: 1,
    maxOutput: 3,
    outputs: [],
    inputs: []
  })

  adapters.forEach((n) => {
    add({
      number: n,
      minInput: n - 3,
      maxInput: n - 1,
      minOutput: n + 1,
      maxOutput: n + 3, 
      outputs: [],
      inputs: []
    })
  })

  all().forEach((entry) => {
    const {number} = entry

    const outputs = where({minInput: {lte: number}}, {maxInput: {gte: number}})

    entry.outputs = outputs.map((e) => e.number)

    const inputs = where({minOutput: {lte: number}}, {maxOutput: {gte: number}})

    entry.inputs = inputs.map((e) => e.number)

    update(entry)
  })

  const results: {[test: string]: number} = {}

  const countRoutes = (n: number) => {
    const {outputs} = lookup(n)

    if(outputs.length === 0){
      return 1
    }

    if(outputs.length !== 0){
      const key = `${n}`
      
      if(results[key]){
        return results[key]
      }

      const result = outputs.reduce((c, o) => {
        return c + countRoutes(o)
      }, 0)

      results[key] = result

      return result
    }
  }

  return countRoutes(0)
}