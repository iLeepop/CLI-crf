#!/usr/bin/env node
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { open } from "./http/open.js"
import { rtd, sayname } from "./crud/who.js"

const argv = yargs(hideBin(process.argv))

const serve = (port) => {
  console.log(port)
}

argv.command('serve [port]', 'start the server', (yargs) => {
  return yargs.positional('port', {
    describe: 'port to bind on',
    default: 5000
  })
}, (argv) => {
  if (argv.verbose) console.info(`start server on : ${argv.port}`)
  serve(argv.port)
})
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging',
    default: true,
  })
  .command('open [url]', 'open the browser', (yargs) => {
    return yargs.positional('url', {
      describe: 'the web url',
      default: 'https://bilibili.com'
    })
  }, (argv) => {
    open(argv.url)
  })
  .command('whoami', 'set usr name', (yargs) => {
    return
  }, () => {
    sayname()
  })
  .command('rtd', 'get some you forgot', (yargs) => {
    return
  }, (argv) => {
    if (argv.who && argv.path) {
      return
    } else if (argv.who) {
      rtd('who', 'get', argv.who)
    } else {
      rtd()
    }
  })
  .option('who', {
    alias: 'w',
    type: 'string',
    description: 'the user name',
  })
  .option('path', {
    alias: 'p',
    type: 'string',
    description: 'the path to the file',
  })
  .parse()