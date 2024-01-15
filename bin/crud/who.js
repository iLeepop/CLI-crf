import inquirer from 'inquirer'
import chalk from 'chalk'
import { readConfig, writeConfig } from './config.js'

export const sayname = async () => {
  const usr = await inquirer.prompt([
    { name: 'name', message: 'Enter your name: ', type: 'input' },
  ])
  usr.name = usr.name.trim()
  console.log(chalk.greenBright(`Hi, ${usr.name}, my name is CRfv`));
}

export const get = async (key) => {
  const config = await readConfig()
  if (config[key] !== undefined) {
    console.log(chalk.greenBright(config[key])) 
    
  }
}

export const getList = async () => {
  const config = await readConfig()
  const list = Object.keys(config)
  if (list.length > 0) {
    console.log(chalk.greenBright(`List of keys:`))
    list.forEach((key) => {
      console.log(chalk.greenBright(key))
    })
  } else {
    console.log(chalk.redBright(`No keys found`))
  }
}

export const set = async (key, value) => {
  const config = await readConfig()
  if (config[key]) {
    config[key] = value
    await writeConfig(config)
    console.log(chalk.greenBright('success set the value'))
  } else {
    console.log(chalk.redBright(`No key found`))
  }
}