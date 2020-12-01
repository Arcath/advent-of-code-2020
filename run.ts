const main = async () => {
  const num = process.argv.pop()
  const puzzle = require(`./${num}/puzzle`)

  await puzzle.main()
}

main()