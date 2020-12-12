import fs from 'fs'
import path from 'path'

const {readFile} = fs.promises

export type Floor = "."
export type Empty = "L"
export type Occupied = "#"

export type Tile =
  Floor |
  Empty |
  Occupied

export const FLOOR: Floor = "."
export const EMPTY: Empty = "L"
export const OCCUPIED: Occupied = "#"

export const main = async () => {
  const INPUT = (await readFile(path.join(process.cwd(), '11', 'input.txt'))).toString()

  const map = parseMap(INPUT)

  const stable = findStable(map)

  console.log(`Stable at: ${stable}`)
}

export const parseMap = (map: string): Tile[][] => {
  return map.split(/\r\n|\n|\r/).map((row) => row.split('')) as any
}

export const applyRules = (map: Tile[][]) => {
  const newMap = map.map((row) => {
    return row.map((col) => {
      return col
    })
  })

  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      const yAxis = [y - 1, y, y + 1]
      const xAxis = [x - 1, x, x + 1]

      const checks: Tile[] = []

      yAxis.forEach((cy) => {
        if(map[cy]){
          xAxis.forEach((cx) => {
            if(cx === x && cy === y){
              return
            }

            if(map[cy][cx]){
              checks.push(map[cy][cx])
            }
          })
        }
      })

      const oCount = checks.reduce((c, t) => {
        if(t === OCCUPIED){
          return c + 1
        }

        return c
      }, 0)

      if(map[y][x] === EMPTY && oCount === 0){
        newMap[y][x] = OCCUPIED
      }

      if(map[y][x] === OCCUPIED && oCount >= 4){
        newMap[y][x] = EMPTY
      }
    })
  })

  return newMap
}

const countOccupied = (map: Tile[][]) => {
  return map.reduce((c, row) => {
    return c + row.reduce((c, t) => {
      if(t === OCCUPIED){
        return c + 1
      }

      return c
    }, 0)
  }, 0)
}

export const findStable = (map: Tile[][]) => {
  let count = [NaN, countOccupied(map)]

  while(count[0] !== count[1]){
    map = applyRules(map)
    count.shift()
    count.push(countOccupied(map))
  }

  return count[0]
}