import ora from 'ora'
import chalk from 'chalk'
import { get, set } from "../crud/who.js"

export const config = (argv) => {
  switch (argv.operate) {
    case 'get':
      if (argv.key) {
        get(argv.key)
      } else {
        console.log(chalk.redBright('At least need One arg'))
      }
      break
    case 'set':
      if (argv.key && argv.value) {
        set(argv.key, argv.value)
      } else {
        console.log(chalk.redBright('At least need Two arg'))
      }
      break
    default:
      console.log(chalk.redBright('Please input the correct operate'))
      break
  }
}