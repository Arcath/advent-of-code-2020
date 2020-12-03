import fs from 'fs'
import path from 'path'
import {createCanvas, CanvasRenderingContext2D} from 'canvas'
import canvasGifEncoder from 'canvas-gif-encoder'

const {readFile} = fs.promises
const {createWriteStream} = fs

const SCREEN = path.join(process.cwd(), '03', 'screen-X.gif')

export const main = async () => {
  const INPUT = (await readFile(path.join(process.cwd(), '03', 'input.txt'))).toString()
  const rows = INPUT.split(`\r\n`)

  const part1 = await puzzle(rows, 3, 1, true, 0)

  console.log(`Trees: ${part1}`)

  const t1 = await puzzle(rows, 1, 1)
  console.log('run 1 done')
  const t2 = part1
  console.log('run 2 done')
  const t3 = await puzzle(rows, 5, 1)
  console.log('run 3 done')
  const t4 = await puzzle(rows, 7, 1)
  console.log('run 4 done')
  const t5 = await puzzle(rows, 1, 2, true, 1)
  console.log('run 5 done')

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


export const puzzle = async (rows: string[], pX: number, pY: number, visuals: boolean = false, visN: number = 0) => {
  const map: Map = []

  const maxX = (rows.length / pY) * pX

  rows.forEach((row) => {
    let x = row.length
    let add = [...row.split('')]
    while(x < maxX){
      add = [...add, ...row.split('')]
      x += row.length
    }

    map.push(add as any)
  })

  let encoder: any
  let context: CanvasRenderingContext2D

  if(visuals){
    encoder = new canvasGifEncoder(map[0].length, map.length)
    const stream = createWriteStream(SCREEN.replace('X', visN.toString()))
    encoder.createReadStream().pipe(stream)
    encoder.begin()

    const canvas = createCanvas(map[0].length, map.length)
    context = canvas.getContext('2d')

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

    context.save()
  }

  const draw = async (posX: number, posY: number) => {
    context.restore()

    context.strokeStyle = 'red'
    context.beginPath()
    context.moveTo(0,0)
    context.lineTo(posX, posY)
    context.stroke()

    encoder.addFrame(context, 250)
  }


  let x = 0
  let y = 0
  let trees = 0

  while(y < map.length){
    if(map[y][x] === TREE){
      trees += 1
    }

    if(visuals){
      await draw(x, y)
    }

    y += pY
    x += pX
  }

  if(visuals){
    encoder.end()
  }

  return trees
}