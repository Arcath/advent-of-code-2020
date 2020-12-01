import fs from 'fs'
import path from 'path'

const {readFile} = fs.promises

interface Result{
  two: [number, number, number]
  three: [number, number, number, number]
}

export const main = async () => {
  // Read te input from the text file.
  const INPUT = (await readFile(path.join(process.cwd(), '01', 'input.txt'))).toString()

  // Turn the input into an array of numbers.
  const numbers = INPUT.split('\n').map((n) => parseInt(n))
  
  // Get the result from the puzzle function
  const result = puzzle(numbers)

  // Output the result to the console.
  console.log(`Puzzle 1: ${result.two[0]} and ${result.two[1]} result ${result.two[2]}`)
  console.log(`Puzzle 2: ${result.three[0]}, ${result.three[1]} and ${result.three[2]} result ${result.three[3]}`)
}

export const puzzle = (numbers: number[]): Result => {
  const result: Partial<Result> = {}

  // Create a second array of the numbers.
  const toTest = [...numbers]

  // For each number ...
  numbers.forEach((n1) => {
    if(result.two){
      // Early return if there is already an answer
      return
    }

    // Remove the first number from the test list.
    toTest.shift()

    // For all the other numbers run the test.
    toTest.forEach((n2) => {
      if(n1 + n2 === 2020){
        result.two = [n1, n2, n1 * n2]
      }
    })
  })

  // Create a copy of numbers.
  const n2s = [...numbers]

  // For every number ...
  numbers.forEach((n1) => {

    // Create a thrid copy of the list.
    const n3s = [...numbers]

    // Remove the first entry from the second list.
    n2s.shift()

    // For each entry in the second list ...
    n2s.forEach((n2) => {

      // Remove the first entry from the third list.
      n3s.shift()

      // For each entry in the third list run the test.
      n3s.forEach((n3) => {
        if((n1 + n2 + n3) === 2020){
          result.three = [n1, n2, n3, n1 * n2 * n3]
        }
      })
    })
  })

  return result as Result
}