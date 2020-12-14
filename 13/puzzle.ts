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

  const seq = findSequence(busLine)

  console.log(`First sequence occurance: ${seq}`)
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


// Inspired by https://github.com/matthewgehring/adventofcode/blob/main/2020/day13/script.js
export const findSequence = (busLine: string) => {
  const busIds = busLine.split(',')

  const buses = busIds.map((val) => Number(val) ? BigInt(val): "x")
  const pairs = buses.map((elm, i) => {
      if(typeof(elm) === "bigint") return [elm, BigInt(i)];
  }).filter(elm => elm)
  let N = BigInt(1)
  
  pairs.forEach(([n]) => N *= n)

  const Ni = pairs.map(([n]) => N/n)
  const b = pairs.map(([n, r], i) => i===0 ? BigInt(0) : n - r )
  const x = pairs.map(([n],i) => modInverse(Ni[i], n))
  const bnx = Ni.map((item, i) => item*b[i]*x[i])
  const sum = bnx.reduce((acc, cur) => acc + cur)
  return sum - (sum / N ) * N
}

const modInverse = (a: bigint, m: bigint) => {
  const g = gcd(a, m);

  if(g !== BigInt(1)){
      console.log("No Inverse");
  } else {
      return power(a, m-BigInt(2), m)
  }
}

const power = (x: bigint, y: bigint, m: bigint): bigint => {
  if(y===BigInt(0)) return BigInt(1)

  let p = power(x, y/BigInt(2), m) % m
  p = (p*p) % m

  if(y % BigInt(2) === BigInt(0)){
    return p
  }
  
  return ((x*p) % m)
}

const gcd = (a: bigint, b: bigint) => {
  if(a === BigInt(0)) return b

  return gcd(b % a, a)
}