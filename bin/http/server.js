import express from 'express'
import chalk from 'chalk'
import bodyParser from 'body-parser'
import http from 'node:http'
import { rootStatic, rootIndex, staticHandler } from './static.js'
import { createWebSocket } from './ws.js'

const app = express()

app.use(bodyParser.json({ type: 'application/*+json' }))

export const serstart = (port, callback) => {

  if (false) {
    console.log(chalk.bold.yellow('Enable Static Access'))
    app.use(rootStatic)
  }

  if (true) {
    console.log(chalk.bold.yellow('Enable Static Handler Access'))
    app.use(staticHandler)
  }

  if (true) {
    console.log(chalk.bold.yellow('Enable Index Access'))
    app.use(rootIndex)
  }

  const server = http.createServer(app)

  server.addListener('upgrade', createWebSocket)

  server.listen(port, () => {
    console.log(chalk.bold.green(`Server on http://localhost:${port}`))
  })

  return server
}