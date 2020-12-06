import fs from 'fs'
import path from 'path'
import {keys} from '@arcath/utils'

const {readFile} = fs.promises

export const main = async () => {
  const INPUT = (await readFile(path.join(process.cwd(), '06', 'input.txt'))).toString()

  const count = countAnswers(INPUT.split(`\r\n\r\n`))

  console.log(`Sum of Counts: ${count}`)

  const countAll = countAllAnswers(INPUT.split(`\r\n\r\n`))
  
  console.log(`Sum All counts: ${countAll}`)
}

export const countAnswers = (groups: string[]) => {
  return groups.reduce((count, group) => {
    return (count + countLetters(group.replace((/  |\r\n|\n|\r/gm),"").split('')))
  }, 0)
}

export const countLetters = (letters: string[]) => {
  const found = []

  return letters.reduce((count, letter) => {
    if(!letter.match(/\n/) && !found.includes(letter)){
      found.push(letter)
      return count + 1
    }

    return count
  }, 0)
}

export const countAllAnswers = (groups: string[]) => {
  return groups.reduce((count, group) => {
    const persons = group.split(/\r\n|\r|\n/)

    const answers: {[letter: string]: number} = {}

    persons.forEach((person) => {
      const letters = person.split('')

      letters.forEach((letter) => {
        if(!answers[letter]){
          answers[letter] = 1
        }else{
          answers[letter] += 1
        }
      })
    })

    let add = 0
    keys(answers).forEach((letter) => {
      if(answers[letter] === persons.length){
        add += 1
      }
    })

    return count + add
  }, 0)
}