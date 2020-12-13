import fs from 'fs'
import path from 'path'

const {readFile} = fs.promises

export const main = async () => {
  const INPUT = (await readFile(path.join(process.cwd(), '13', 'input.txt'))).toString()

  const [ts, busLine] = INPUT.split(/\r\n/)

  const currentTime = parseInt(ts)

  const busses = parseBusLine(busLine)

  const first = findFirstBus(currentTime, busses)

  console.log(`First Bus check: ${first.bus * first.time}`)
}

export const parseBusLine = (line: string): number[] => {
  const t = line.split(',')

  return t.reduce((busses, b) => {
    if(b === 'x'){
      return busses
    }

    busses.push(parseInt(b))

    return busses
  }, [])
}

export const findFirstBus = (stamp: number, busses: number[]) => {
  const result = {
    bus: 0,
    time: 0
  }

  let c = 0
  while(result.bus === 0){
    const s = stamp + c
    busses.forEach((b) => {
      if(s % b === 0){
        result.bus = b
        result.time = c
      }
    })

    c += 1
  }

  return result
}