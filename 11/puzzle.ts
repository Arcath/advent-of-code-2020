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

  const facingStable = findFacingStable(map)

  console.log(`Facing Stable at: ${facingStable}`)
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

export const findFacingSeats = (map: Tile[][], [x, y]: number[]): number[][] => {
  const findSeat = (x: number, y: number, change: (x: number, y: number) => [number, number]): [number, number] | undefined => {
    if(x < 0 || y < 0 || x >= map[0].length || y >= map.length){
      return undefined
    }

    if(map[y][x] !== FLOOR){
      return [x, y]
    }

    const next = change(x, y)

    return findSeat(next[0], next[1], change)
  }

  const seats: number[][] = []

  const north = findSeat(x, y - 1, (x, y) => {
    return [x, y - 1]
  })
  const northEast = findSeat(x + 1, y - 1, (x, y) => {
    return [x + 1, y - 1]
  })
  const east = findSeat(x + 1, y, (x, y) => {
    return [x + 1, y]
  })
  const southEast = findSeat(x + 1, y + 1, (x, y) => {
    return [x + 1, y + 1]
  })
  const south = findSeat(x, y + 1, (x, y) => {
    return [x, y + 1]
  })
  const southWest = findSeat(x - 1, y + 1, (x, y) => {
    return [x - 1, y + 1]
  })
  const west = findSeat(x - 1, y, (x, y) => {
    return [x - 1, y]
  })
  const northWest = findSeat(x - 1, y - 1, (x, y) => {
    return [x - 1, y - 1]
  })

  const potentials: number[][] = [north, northEast, east, southEast, south, southWest, west, northWest] as any

  potentials.forEach((seat) => {
    if(seat !== undefined){
      seats.push(seat)
    }
  })

  return seats
}

export const applyFacingRules = (map: Tile[][]) => {
  const newMap = map.map((row) => {
    return row.map((col) => {
      return col
    })
  })

  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      const checks: Tile[] = []

      const facing = findFacingSeats(map, [x, y])

      facing.forEach(([x, y]) => {
        if(map[y][x]){
          checks.push(map[y][x])
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

      if(map[y][x] === OCCUPIED && oCount >= 5){
        newMap[y][x] = EMPTY
      }
    })
  })

  return newMap
}

export const findFacingStable = (map: Tile[][]) => {
  let count = [NaN, countOccupied(map)]

  while(count[0] !== count[1]){
    map = applyFacingRules(map)
    count.shift()
    count.push(countOccupied(map))
  }

  return count[0]
}