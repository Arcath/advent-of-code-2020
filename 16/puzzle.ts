import {keys} from '@arcath/utils'
import fs from 'fs'
import path from 'path'

const {readFile} = fs.promises

export const main = async () => {
  const INPUT = (await readFile(path.join(process.cwd(), '16', 'input.txt'))).toString()

  const lines = INPUT.split(`\r\n`)

  const {invalidSum, myTicketHash} = parseInput(lines)

  console.log(`invalid sum: ${invalidSum}`)
  console.log(`my ticket hash: ${myTicketHash}`)
}

export const parseInput = (lines: string[]) => {
  let mode = 0
  const rules: {[name: string]: [number, number][]} = {}
  let myTicket: number[] = []
  const tickets: number[][] = []
  const validTickets: number[][] = []

  lines.forEach((line) => {
    if(line === ""){
      return
    }

    if(line === "your ticket:"){
      mode = 1
      return
    }

    if(line === "nearby tickets:"){
      mode = 2
      return
    }

    switch(mode){
      case 0:
        const [, name, min1, max1, min2, max2] = line.match(/^([a-z ]*): ([0-9]*)-([0-9]*) or ([0-9]*)-([0-9]*)$/)

        rules[name] = [[parseInt(min1), parseInt(max1)], [parseInt(min2), parseInt(max2)]]
        break;
      case 1:
        myTicket = line.split(',').map((s) => parseInt(s))
        break;
      case 2:
        tickets.push(line.split(',').map((s) => parseInt(s)))
        break;
    }
  })

  const validateNumber = (number: number) => {
    return keys(rules).reduce((valid, rule) => {
      if(valid){
        return true
      }

      return rules[rule].reduce((v, [low, high]) => {
        if(v){
          return true
        }

        return (number >= low && number <= high)
      }, false)
    }, false)
  }

  const invalidSum = tickets.reduce((sum, ticket) => {
    let valid = true
    ticket.forEach((number) => {
      if(!validateNumber(number)){
        sum += number
        valid = false
      }
    })

    if(valid){
      validTickets.push(ticket)
    }

    return sum
  }, 0)

  let unknownColumns = keys(rules)
  const columns: {[column: string]: number} = {}

  while(unknownColumns.length > 0){
    const rule = unknownColumns.shift()
    let potentials: number[] = []

    for(let i = 0; i < validTickets[0].length; i++){
      if(!Object.values(columns).includes(i)){
        potentials.push(i)
      }
    }

    validTickets.forEach((ticket) => {
      potentials.forEach((col) => {
        const valid = rules[rule].reduce((v, [low, high]) => {
          if(v){
            return true
          }
  
          return (ticket[col] >= low && ticket[col] <= high)
        }, false)

        if(!valid){
          potentials = potentials.filter((c) => c !== col)
        }
      })
    })

    if(potentials.length > 1){
      unknownColumns.push(rule)
    }else{
      const column = potentials.shift()
      columns[rule] = column
    }
  }

  const myTicketHash = (keys(columns) as string[]).reduce((sum, rule) => {
    if(rule.substr(0, 3) === "dep"){
      if(sum === 0){
        return myTicket[columns[rule]]
      }else{
        return sum * myTicket[columns[rule]]
      }
    }

    return sum
  }, 0)

  return {
    invalidSum,
    validTickets: validTickets.length,
    myTicketHash
  }
}