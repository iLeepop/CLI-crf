#!/usr/bin/env node
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { open } from "./http/open.js"
import { sayname } from "./crud/who.js"
import { config } from "./cmd/rtd.js"

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
  .command('config [operate] [key] [value]', 'config info', (yargs) => {
    return yargs.positional('operate', {
      describe: 'the operate',
      choices: ['get', 'set']
    }).positional('key', {
      describe: 'the key',
    }).positional('value', {
      describe: 'the value',
    })
  }, (argv) => config(argv))
  .epilogue('CRf v1.0.0')
  .parse()