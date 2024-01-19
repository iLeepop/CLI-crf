#!/usr/bin/env node
import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { openj } from "./http/open.js"
import { sayname } from "./crud/who.js"
import { config, rmb, wis } from "./cmd/rtd.js"
import { serve } from "./cmd/serve.js"

const argv = yargs(hideBin(process.argv))

argv.command('serve [port]', 'start the server', (yargs) => {
  return yargs.positional('port', {
    describe: 'port to bind on',
    default: 5000
  })
}, (argv) => {
  serve(argv)
})
  .command('open [url]', 'open the browser', (yargs) => {
    return yargs
      .positional('url', {
        describe: 'the web url',
        default: 'https://bilibili.com'
      })
  }, (argv) => {
    openj(argv.url)
  })
  .command('whoami', 'say name', (yargs) => {
    return
  }, () => {
    sayname()
  })
  .command('config [key] [value]', 'config info', (yargs) => {
    return yargs
      .positional('key', {
        describe: 'the key',
      }).positional('value', {
        describe: 'the value',
      })
  }, (argv) => config(argv))
  .option('list', {
    alias: 'l',
    describe: 'list all config',
    type: 'boolean',
  })
  .command('lmk [scope] [key]', 'rmb me some thing', (yargs) => {
    return yargs
      .positional('key1', {
        describe: 'first key',
      }).positional('key2', {
        describe: 'sec key',
      })
  }, (argv) => rmb(argv))
  .option('replace', {
    alias: 'r',
    type: 'string',
    describe: 'replace value',
  })
  .command('wis', 'what i say?', (yargs) => {
    return
  }, (argv) => wis(argv))
  .epilogue('CRf v1.0.0')
  .parse()