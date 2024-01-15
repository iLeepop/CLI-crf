import inquirer from 'inquirer'
import chalk from 'chalk'
import ora from 'ora'
import { readConfig } from './config.js'

export const sayname = async () => {
  const usr = await inquirer.prompt([
    { name: 'name', message: 'Enter your name: ', type: 'input' },
  ])
  usr.name = usr.name.trim()
  console.log(chalk.greenBright(`Hi, ${usr.name}, my name is CRfv`));
}

export const rtd = async (key, method, value) => {
  const config = await readConfig()
  if (method === 'get') {
    if (value) {
      console.log(config[key][value]);
      return
    }
    console.log(config[key])
    return
  } else if (method === 'set') {
    config[key] = value
    await writeConfig(config)
    return
  }
}