import ora from 'ora'
import inquirer from 'inquirer'
import chalk from 'chalk'
import { get, getList, set } from "../crud/who.js"
import { tlm, setin } from '../crud/way.js'

export const config = (argv) => {
  const operate = (argv.key && argv.value) ? 'set' : 'get'
  switch (operate) {
    case 'get':
      if (argv.list) {
        getList()
      } else if (argv.key) {
        get(argv.key)
      } else {
        console.log(chalk.bold.redBright('At least need One arg'))
      }
      break
    case 'set':
      if (argv.key && argv.value) {
        set(argv.key, argv.value)
      } else {
        console.log(chalk.bold.redBright('At least need Two arg'))
      }
      break
    default:
      console.log(chalk.bold.redBright('Please input the correct operate'))
      break
  }
}

export const rmb = async (argv) => {
  await tlm(argv)
}

export const wis = async (argv) => {
  await setin()
}