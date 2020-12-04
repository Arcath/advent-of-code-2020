import fs from 'fs'
import path from 'path'

const {readFile} = fs.promises

export const main = async () => {
  const INPUT = (await readFile(path.join(process.cwd(), '04', 'input.txt'))).toString()

  const valid = cidOptional(INPUT.split(`\r\n\r\n`))

  console.log(`Valid: ${valid}`)

  const nowValid = validData(INPUT.split(`\r\n\r\n`))

  console.log(`Now Valid: ${nowValid}`)
}


export const cidOptional = (passports: string[]) => {
  let valid = 0

  passports.forEach((passport) => {
    const fields = passport.match(/([a-z][a-z][a-z]):([\w|#]*)/g)

    const found = []

    fields.forEach((field) => {
      const [f] = field.split(':')

      found.push(f)
    })

    if(found.length === 8){
      valid += 1
      return
    }

    if(found.length === 7 && !found.includes('cid')){
      valid += 1
      return
    }
  })

  return valid
}

export const validData = (passports: string[]) => {
  let valid = 0

  passports.forEach((passport) => {
    const fields = passport.match(/([a-z][a-z][a-z]):([\w|#]*)/g)

    const found = []

    fields.forEach((field) => {
      const [f, v] = field.split(':')

      found.push([f, v])
    })

    if(validate(found)){
      valid += 1
      return
    }
  })

  return valid
}

const validate = (fields: string[][]): boolean => {
  if(fields.length < 7){
    return false
  }

  if(fields.length === 7){
    const names = fields.map((field) => field[0])

    if(names.includes('cid')){
      return false
    }
  }

  return fields.reduce((v, f) => {
    if(!v){ return false }

    const [field, value] = f

    switch(field){
      case 'byr':
        const birthYear = parseInt(value)
        return (birthYear >= 1920 && birthYear <= 2002)
      case 'iyr':
        const issueYear = parseInt(value)
        return (issueYear >= 2010 && issueYear <= 2020)
      case 'eyr':
        const exprYear = parseInt(value)
        return (exprYear >= 2020 && exprYear <= 2030)
      case 'pid':
        return (value.length === 9)
      case 'ecl':
        return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)
      case 'hgt':
          if(!value.match(/[cm|in]/)){
            return false
          }

          const n = parseInt(value.substr(0, value.length - 2))
          if(!!value.match(/cm/)){
            return (n >= 150 && n <= 193)
          }

          return (n >= 59 && n <= 76)
      case 'hcl':
        return !!value.match(/^#[0-9a-f]{6}$/)
      case 'cid':
        return true
      default:
        return v
    }
  }, true)
}