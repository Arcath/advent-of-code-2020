export const compute = (code: string[]) => {
  let acc = 0
  let ptr = 0

  const runInstruction = () => {
    const {instruction, number} = parseLine(code[ptr])

    switch(instruction){
      case 'jmp':
        ptr += number
        break;
      case 'acc':
        acc += number
        ptr += 1
        break;
      case 'nop':
        ptr += 1
        break;
    }
  }

  const get = (value: 'acc' | 'ptr') => {
    switch(value){
      case 'acc':
        return acc
      case 'ptr':
        return ptr
    }
  }

  const finished = () => {
    return (ptr === code.length)
  }

  return {
    get,
    runInstruction,
    finished
  }
}

export const parseLine = (line: string) => {
  const [instruction, signedNumber] = line.split(' ')
  const number = parseInt(signedNumber)

  return {instruction, number, signedNumber}
}