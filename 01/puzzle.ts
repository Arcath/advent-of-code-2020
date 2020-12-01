import fs from 'fs'
import path from 'path'

const {readFile} = fs.promises

const main = async () => {
  const INPUT = (await readFile(path.join(process.cwd(), '01', 'input.txt'))).toString()

  const numbers = INPUT.split('\n').map((n) => parseInt(n))
  
  numbers.forEach((number) => {
    numbers.forEach((test) => {
      if(number + test === 2020){
        console.log([number, test])
        console.log(number * test)
      }
    })
  })

  numbers.forEach((n1) => {
    numbers.forEach((n2) => {
      numbers.forEach((n3) => {
        if((n1 + n2 + n3) === 2020){
          console.log([n1, n2, n3])
          console.log(n1 * n2 * n3)
        }
      })
    })
  })
}

main()