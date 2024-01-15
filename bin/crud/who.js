import inquirer from 'inquirer'
import chalk from 'chalk'
import ora from 'ora'

export const sayname = async () => {
  const usr = await inquirer.prompt([
    { name: 'name', message: 'Enter your name: ', type: 'input' },
  ])
  usr.name = usr.name.trim()
  console.log(chalk.greenBright(`Hi, ${usr.name}, my name is CRfv`));
}