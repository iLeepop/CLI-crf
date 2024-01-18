import express from 'express'
import chalk from 'chalk'
import { rootStatic, rootIndex } from './static.js'

const app = express()

export const serstart = (port) => {

  if (true) {
    console.log(chalk.bold.yellow('Enable Static Access'))
    app.use(rootStatic).use(rootIndex)
  }

  app.listen(port, () => {
    console.log(chalk.bold.green(`Server on http://localhost:${port}`))
  })
}