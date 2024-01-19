import inquirer from 'inquirer'
import chalk from 'chalk'
import { convertPath, readConfig, writeConfig } from './configIO.js'

export const sayname = async () => {
  const usr = await inquirer.prompt([
    { name: 'name', message: 'Enter your name: ', type: 'input' },
  ])
  usr.name = usr.name.trim()
  console.log(chalk.bold.greenBright(`Hi, ${usr.name}, my name is CRfv`));
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
    console.log(chalk.bold.bgYellowBright.blueBright(`List of keys:`))
    list.forEach((key) => {
      console.log(chalk.greenBright(key))
    })
  } else {
    console.log(chalk.bold.redBright(`No keys found`))
  }
}

export const set = async (key, value) => {
  const config = await readConfig()
  if (config[key]) {
    if (key === 'token') {
      config[key] = convertPath(value)
    } else {
      config[key] = value
    }
    await writeConfig(config)
    console.log(chalk.bold.greenBright('success set the value'))
  } else {
    console.log(chalk.bold.redBright(`No key found`))
  }
}