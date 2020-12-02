import fs from 'fs'
import path from 'path'

const {readFile} = fs.promises

export const main = async () => {
  const INPUT = (await readFile(path.join(process.cwd(), '02', 'input.txt'))).toString()

  const lines = INPUT.split('\n')

  console.log(`Part 1: ${part1(lines)}`)

  console.log(`Part 2: ${part2(lines)}`)
}

export const part1 = (input: string[]): number => {
  let valid = 0

  input.forEach((input) => {
    if(input.length < 5){
      return
    }

    const [, min, max, char, password] = input.match(/([0-9]*)-([0-9]*) ([a-z]): ([a-z]*)/)

    const exp = new RegExp(char, 'g')
    const count = password.match(exp) || []

    if(count.length >= parseInt(min) && count.length <= parseInt(max)){
      valid += 1
    }
  })

  return valid
}

export const part2 = (input: string[]): number => {
  let valid = 0

  input.forEach((input) => {
    if(input.length < 5){
      return
    }

    const [, first, second, char, password] = input.match(/([0-9]*)-([0-9]*) ([a-z]): ([a-z]*)/)

    const firstChar = password.charAt(parseInt(first) - 1)
    const secondChar = password.charAt(parseInt(second) - 1)

    if((firstChar === char || secondChar === char) && firstChar !== secondChar){
      valid += 1
    }
  })

  return valid
}