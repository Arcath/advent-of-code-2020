import fs from 'fs'
import path from 'path'
import {createCanvas} from 'canvas'

const {readFile, writeFile} = fs.promises

const SCREEN = path.join(process.cwd(), '03', 'screen.jpg')

export const main = async () => {
  const INPUT = (await readFile(path.join(process.cwd(), '03', 'input.txt'))).toString()
  const rows = INPUT.split(`\r\n`)

  const part1 = await puzzle(rows, 3, 1)

  console.log(`Trees: ${part1}`)

  const t1 = await puzzle(rows, 1, 1)
  const t2 = part1
  const t3 = await puzzle(rows, 5, 1)
  const t4 = await puzzle(rows, 7, 1)
  const t5 = await puzzle(rows, 1, 2)

  const part2 = [t1, t2, t3, t4, t5].reduce((count, n) => {
    return count * n
  })

  console.log(`Multiplied: ${part2}`)
}

type Tree = "#"
type Open = "."

type Cell = Tree | Open

type Map = Cell[][]

export const TREE: Tree = '#'
export const OPEN: Open = '.'


export const puzzle = async (rows: string[], pX: number, pY: number) => {
  const map: Map = []

  const maxX = (rows.length / pY) * pX

  const draw = async (posX: number, posY: number) => {
    const canvas = createCanvas(map[0].length, map.length)
    const context = canvas.getContext('2d')

    map.forEach((row, y) => {
      row.forEach((cell, x) => {
        if(cell === TREE){
          context.fillStyle = "brown"
        }else{
          context.fillStyle = "green"
        }

        context.fillRect(x, y, 1, 1)
      })
    })

    context.fillStyle = 'red'
    context.beginPath()
    context.moveTo(0,0)
    context.lineTo(posX, posY)
    context.stroke()

    const buffer = canvas.toBuffer()

    await writeFile(SCREEN, buffer)
  }

  rows.forEach((row) => {
    let x = row.length
    let add = [...row.split('')]
    while(x < maxX){
      add = [...add, ...row.split('')]
      x += row.length
    }

    map.push(add as any)
  })

  let x = 0
  let y = 0
  let trees = 0

  while(y < map.length){
    if(map[y][x] === TREE){
      trees += 1
    }

    y += pY
    x += pX
  }

  await draw(x, y)

  return trees
}