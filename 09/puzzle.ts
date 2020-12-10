import fs from 'fs'
import path from 'path'

const {readFile} = fs.promises

export const main = async () => {
  const INPUT = (await readFile(path.join(process.cwd(), '09', 'input.txt'))).toString()

  const invalid = xmas(INPUT.split(`\r\n`), 25)

  console.log(`First invalid: ${invalid[0]}`)

  const check = breakXmas(INPUT.split(`\r\n`), invalid[0])

  console.log(`Check number: ${check}`)
}

const sums = (numbers: number[]) => {
  const results: number[] = []

  numbers.forEach((number, i) => {
    numbers.forEach((add, j) => {
      if(i !== j && !results.includes(number + add)){
        results.push(number + add)
      }
    })
  })

  return results
}

export const xmas = (hash: string[], preamble: number) => {
  const countable: number[] = []
  const invalid: number[] = []

  for(let i = 0; i < preamble; i++){
    const n = parseInt(hash.shift())

    countable.push(n)
  }

  while(hash.length > 0){
    const n = parseInt(hash.shift())

    const values = sums(countable)

    if(!values.includes(n)){
      invalid.push(n)
    }

    countable.shift()
    countable.push(n)
  }

  return invalid
}

export const breakXmas = (hash: string[], target: number) => {
  const numbers = hash.map((n) => parseInt(n))

  return numbers.reduce((c, number, i) => {
    if(c !== 0){
      return c
    }

    let check = number
    let min = number
    let max = number
    let j = i + 1
    while(check < target){
      const n = numbers[j]
      
      if(n < min){
        min = n
      }

      if(n > max){
        max = n
      }

      check += n
      j++
    }

    if(check === target){
      return min + max
    }

    return c
  }, 0)
}