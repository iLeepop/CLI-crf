import chalk from 'chalk'

import { serstart } from '../http/server.js'
import { openj } from '../http/open.js'
import LiveServer from '../http/live.js'

export const serve = (argv) => {
  LiveServer.server(argv.port)
  openj(`http://localhost:${argv.port}`)
} 