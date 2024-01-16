import chalk from 'chalk'

import { serstart } from '../http/server.js'
import { openj } from '../http/open.js'

export const serve = (argv) => {
  serstart(argv.port)
  openj(`http://localhost:${argv.port}`)
} 