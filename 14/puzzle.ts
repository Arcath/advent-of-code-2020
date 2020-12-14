import fs from 'fs'
import path from 'path'

const {readFile} = fs.promises

export const main = async () => {
  const INPUT = (await readFile(path.join(process.cwd(), '14', 'input.txt'))).toString()

  const instructions = INPUT.split(`\r\n`)

  const memory = initialize(instructions)
  
  const total = memory.reduce((c, n) => c + n)

  console.log(`Memory total: ${total}`)

  const [locMemory, usedLocs] = initializeMemoryLocs(instructions)

  const locTotal = usedLocs.reduce((c, loc) => {
    return c + locMemory[loc]
  }, BigInt(0))

  console.log(`v2 Memory total: ${locTotal}`)
}

export const initialize = (instructions: string[]) => {
  const memory: bigint[] = []
  let mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

  instructions.forEach((inst) => {
    if(inst.substr(0,4) === "mask"){
      mask = inst.substr(7, inst.length)

      return
    }

    const [, locS, numS] = inst.match(/^mem\[([0-9]*)\] = ([0-9]*)$/)

    const loc = parseInt(locS)
    const num = BigInt(numS)

    memory[loc] = maskNumber(num, mask)
  })

  return memory
}

const maskNumber = (num: bigint, mask: string) => {
  mask.split('').reverse().forEach((char, i) => {
    if(char === 'X'){
      return
    }

    const current = !!((BigInt(1) << BigInt(i)) & num)

    if(char === '1' && !current){
      num = (BigInt(1) << BigInt(i)) ^ num
    }

    if(char === '0' && current){
      num = (BigInt(1) << BigInt(i)) ^ num
    }
  })

  return num
}

const maskLoc = (num: bigint, mask: string) => {
  mask.split('').reverse().forEach((char, i) => {
    if(char === 'X'){
      return
    }

    const current = !!((BigInt(1) << BigInt(i)) & num)

    if(char === '1' && !current){
      num = (BigInt(1) << BigInt(i)) ^ num
    }
  })

  return num
}

export const initializeMemoryLocs = (instructions: string[]) => {
  const memory: bigint[] = []
  let mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
  const usedLocs = []

  instructions.forEach((inst) => {
    if(inst.substr(0,4) === "mask"){
      mask = inst.substr(7, inst.length)

      return
    }

    const [, locS, numS] = inst.match(/^mem\[([0-9]*)\] = ([0-9]*)$/)

    let loc = BigInt(locS)
    const num = BigInt(numS)

    // Applies the 1/0 masking
    loc = maskLoc(loc, mask)

    const xPos = mask.split('').reduce((c, char, i) => {
      if(char === "X"){
        c.push(i)
      }

      return c
    }, []).map((pos) => 35 - pos).reverse()

    const locations: number[] = []

    for(let i = 0; i < (2**(xPos.length)); i++){
      let tLoc = loc

      xPos.forEach((pos, j) => {
        const currentLoc = !!((BigInt(1) << BigInt(pos)) & tLoc)
        const currentPos = !!((1 << j) & i)

        if(currentLoc !== currentPos){
          tLoc = (BigInt(1) << BigInt(pos)) ^ tLoc
        }
      })

      locations.push(parseInt(tLoc.toString()))
    }

    locations.forEach((l) => {
      memory[l] = num
    })

    locations.forEach((l) => {
      if(!usedLocs.includes(l)){
        usedLocs.push(l)
      }
    })
  })

  return [memory, usedLocs]
}