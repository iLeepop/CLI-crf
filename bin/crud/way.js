import inquirer from 'inquirer'
import chalk from 'chalk'
import { readConfig } from './configIO.js'
import { readcrf, writecrf } from '../util/rw.js'

export const tlm = async (argv) => {
  const config = await readConfig()
  if (config[argv.scope]) {
    const content = await readcrf(config[argv.scope])
    if (!content) {
      console.log(chalk.bold.redBright('here is no content'))
      return
    }
    if (!content[argv.key]) {
      console.log(chalk.bold.redBright('No such key'))
      return
    }
    if (argv.r) {
      content[argv.key] = argv.r
      await writecrf(config[argv.scope], content)
      console.log(chalk.bold.greenBright(`success edit ${argv.key}`))
    } else {
      console.log(chalk.greenBright(content[argv.key]))
    }
  } else {
    console.log(chalk.bold.redBright('Wrong Arg'))
  }
}

export const setin = async () => {
  const config = await readConfig()
  let type = await inquirer.prompt([
    {
      name: 'scope',
      message: 'Type your scope: ',
      type: 'input',
    },
  ])
  type.scope = type.scope.trim()
  if (config[type.scope]) {
    const content = await readcrf(config[type.scope])
    if (content) {
      let obj = await inquirer.prompt([
        {
          name: 'key',
          message: 'Type your key: ',
          type: 'input',
        },
        {
          name: 'value',
          message: 'Type your value: ',
          type: 'input',
        },
      ])
      obj.key = obj.key.trim()
      obj.value = obj.value.trim()
      if (obj.key && obj.value && !content[obj.key]) {
        let tcontent = {
          ...content,
          [obj.key]: obj.value,
        }
        await writecrf(config[type.scope], tcontent)
        console.log(chalk.bold.greenBright(`success edit ${obj.key} in scope ${type.scope}`))
      } else {
        console.log(chalk.bold.redBright('Check your Input and key cant allowed repeat'))
      }
    } else {
      console.log(chalk.bold.redBright(`cant find any .json file in scope :: ${type.scope}`))
    }
  } else {
    console.log(chalk.bold.redBright(`${type.scope} is a invalid scope!`))
  }
}