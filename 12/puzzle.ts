import fs from 'fs'
import path from 'path'

const {readFile} = fs.promises

interface State{
  x: number
  y: number
  direction: number
}

interface WaypointState{
  wX: number
  wY: number
  x: number
  y: number
}

export const initialState: State = {
  x: 0,
  y: 0,
  direction: 90
}

export const initialWState: WaypointState = {
  x: 0,
  y: 0,
  wX: 10,
  wY: 1
}

export const main = async () => {
  const INPUT = (await readFile(path.join(process.cwd(), '12', 'input.txt'))).toString()

  const instructions = INPUT.split(`\r\n`)

  const finalPosition = runInstructions(instructions)

  const manhattanDistance = Math.abs(finalPosition.x) + Math.abs(finalPosition.y)

  console.log(`MD from start: ${manhattanDistance}`)

  const finalWPosition = runWaypointInstructions(instructions)

  const manhattanWDistance = Math.abs(finalWPosition.x) + Math.abs(finalWPosition.y)

  console.log(`MD from start (waypoint): ${manhattanWDistance}`)
}

export const runInstructions = (instructions: string[]) => {
  let state = initialState

  instructions.forEach((inst) => {
    state = move(state, inst)
  })

  return state
}

export const runWaypointInstructions = (instructions: string[]) => {
  let state = initialWState

  instructions.forEach((inst) => {
    state = waypointMove(state, inst)
  })

  return state
}

export const move = ({x, y, direction}: State, instruction: string) => {
  const [, i, n] = instruction.match(/^([A-Z])([0-9]*)$/)

  switch(i){
    case 'N':
      return {x, y: y + parseInt(n), direction}
    case 'S':
      return {x, y: y - parseInt(n), direction}
    case 'E':
      return {x: x + parseInt(n), y, direction}
    case 'W':
      return {x: x - parseInt(n), y, direction}
    case 'L':
      let leftDirection = direction - parseInt(n)

      if(leftDirection < 0){
        leftDirection += 360
      }

      return {x, y, direction:leftDirection}
    case 'R':
      let rightDirection = direction + parseInt(n)

      if(rightDirection >= 360){
        rightDirection -= 360
      }

      return {x, y, direction: rightDirection}
    case 'F':
      switch(direction){
        case 0:
          return move({x, y, direction}, `N${n}`)
        case 90:
          return move({x, y, direction}, `E${n}`)
        case 180:
          return move({x, y, direction}, `S${n}`)
        case 270:
          return move({x, y, direction}, `W${n}`)
      }
  }
}

export const waypointMove = ({x, y, wX, wY}: WaypointState, inst: string) => {
  const [, i, nS] = inst.match(/^([A-Z])([0-9]*)$/)

  const nN = parseInt(nS)

  switch(i){
    case 'N':
      return {x, y, wX, wY: wY + nN}
    case 'S':
      return {x, y, wX, wY: wY - nN}
    case 'E':
      return {x, y, wX: wX + nN, wY}
    case 'W':
      return {x, y, wX: wX - nN, wY}
    case 'L':
      const left = rotate(wX, wY, nN)
      return {x, y, wX: left.x, wY: left.y}
    case 'R':
      const right = rotate(wX, wY, 360 - nN)
      return {x, y, wX: right.x, wY: right.y}
    case 'F':
      return {
        x: (x + (wX * nN)),
        y: (y + (wY * nN)),
        wX, wY
      }
  }
}


export const rotate = (x: number, y: number, deg: number) => {
  const rad = deg * (Math.PI / 180)

  const nX = Math.round((x * Math.cos(rad)) - (y * Math.sin(rad)))
  const nY = Math.round((y * Math.cos(rad)) + (x * Math.sin(rad)))

  return {x: nX, y: nY}
}