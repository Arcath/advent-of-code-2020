import fs from 'fs'
import path from 'path'

const {readFile} = fs.promises

export const main = async () => {
  const INPUT = (await readFile(path.join(process.cwd(), '05', 'input.txt'))).toString()

  const max = INPUT.split('\r\n').reduce((m, code) => {
    const {seatId} = parsePosition(code)

    if(seatId > m){
      return seatId
    }

    return m
  }, 0)

  console.log(`Highest Seat ID: ${max}`)

  const codes = INPUT.split('\r\n').map((code) => {
    return parsePosition(code).seatId
  })

  let code = 0

  const sorted = codes.sort((a,b) => {return a-b})
  
  sorted.forEach((n, i) => {
    if(i !== sorted.length - 1 && sorted[i + 1] !== n + 1){
      code = n + 1
    }
  })

  console.log(`My Seat: ${code}`)
}

export interface Position{
  row: number
  column: number
  seatId: number
}

export const parsePosition = (position: string): Position => {
  const rowRange = [0, 127]
  const columnRange = [0, 7]

  const increment = [64, 32, 16, 8, 4, 2, 1, 4, 2, 1]

  position.split('').forEach((inst, i) => {
    switch(inst){
      case 'F':
          rowRange[1] -= increment[i]
        break
      case 'B':
          rowRange[0] += increment[i]
        break
      case 'L':
          columnRange[1] -= increment[i]
        break
      case 'R':
          columnRange[0] += increment[i]
        break
    }
  })

  const row = rowRange[0]
  const column = columnRange[0]
  const seatId = (row * 8) + column

  return {
    row,
    column,
    seatId
  }
}