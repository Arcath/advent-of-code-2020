import fs from 'fs'
import path from 'path'

import {compute, parseLine} from '../lib/compute'

const {readFile} = fs.promises

export const main = async () => {
  const INPUT = (await readFile(path.join(process.cwd(), '08', 'input.txt'))).toString()

  const {acc} = findInfinateLoopOrFinish(INPUT.split(`\n`))

  console.log(`Acc before loop: ${acc}`)

  const fixedAcc = fixCode(INPUT.split(`\n`))

  console.log(`Acc after fix: ${fixedAcc}`)
}

export const findInfinateLoopOrFinish = (code: string[]) => {
  const {get, runInstruction, finished} = compute(code)

  const visited = []


  let ptr = get('ptr')
  while(!visited.includes(ptr) && !finished()){
    visited.push(ptr)
    runInstruction()
    ptr = get('ptr')
  }

  return {acc: get('acc'), finished: finished()}
}

export const fixCode = (code: string[]) => {
  return code.reduce((c, line, i) => {
    if(c !== 0){
      return c
    }

    const {instruction, signedNumber} = parseLine(line)

    if(instruction === 'jmp' || instruction === 'nop'){
      const sample = [].concat(code)

      if(instruction === 'jmp'){
        sample[i] = `nop ${signedNumber}`
      }else{
        sample[i] = `jmp ${signedNumber}`
      }

      const {finished, acc} = findInfinateLoopOrFinish(sample)

      if(finished){
        return acc
      }
    }

    return 0
  }, 0)
}