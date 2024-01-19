import chokidar from 'chokidar'
import chalk from 'chalk'
import path from 'node:path'

import { pwd } from './pwd.js'

import { clients } from './ws.js'

const ignored = [
  function (testPath) {
    return testPath !== "." && /(^[.#]|(?:__|~)$)/.test(path.basename(testPath))
  }
]

export function handleChange(changePath) {
  let cssChange = path.extname(changePath) === '.css'
  clients.forEach(function (ws) {
    if (ws) ws.send(cssChange ? 'refreshcss' : 'reload')
  })
}

export const watcher = chokidar.watch(pwd, {
  ignored,
  ignoreInitial: true,
})
.on('change', handleChange)
.on('add', handleChange)
.on('unlink', handleChange)
.on('addDir', handleChange)
.on('unlinkDir', handleChange)
.on('ready', function () {
  console.log(chalk.rgb(200, 40, 100).bold('Ready for watching'))
})
.on('error', function (err) {
  console.log('Error', err)
})

