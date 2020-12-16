import cliPorgress from 'cli-progress'

const INPUT = [10,16,6,0,1,17]

export const main = async () => {
  const term = memoryGame(INPUT, 2020)

  console.log(`2020th Term: ${term}`)

  const longTerm = memoryGame(INPUT, 30000000)

  console.log(`30000000th Term: ${longTerm}`)
}

export const memoryGame = (startingList: number[], target: number) => {
  let last = 0

  const bar = new cliPorgress.SingleBar({}, cliPorgress.Presets.shades_classic)
  bar.start(target, 0)

  const counts: {[number: number]: number} = {}
  const lastPoses: {[number: number]: number[]} = {}

  startingList.forEach((v, i) => {
    counts[v] = 1
    lastPoses[v] = [i]
    last = v
    bar.update(i)
  })

  for(let i = startingList.length; i < target; i++){
    bar.update(i)
    let next = 0

    if(counts[last] === 2){
      const lastPos = lastPoses[last].shift()

      next = (i-1) - lastPos
    }

    counts[next] = counts[next] === undefined ? 1 : 2
    if(!lastPoses[next]){
      lastPoses[next] = []
    }
    lastPoses[next].push(i)

    last = next
  }

  bar.stop()

  return last
}