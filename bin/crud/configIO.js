import yargs from "yargs"
import path from 'node:path'
import { fileURLToPath } from "node:url"
import { readcrf, writecrf } from "../util/rw.js"

const __filename = fileURLToPath(import.meta.url) // ESModule only
const __dirname = path.dirname(__filename) // ESModule only
const configPath = path.resolve(__dirname, '../config/config.json') // config.json path

export const readConfig = async () => {
  try {
    return readcrf(configPath)
  } catch (error) {
    yargs.exit(1, error)
  }
}

export const writeConfig = async (config) => {
  try {
    await writecrf(configPath, config)
  } catch (error) {
    yargs.exit(1, error)
  }
}

export const convertPath = (p) => {
  return p.replace(/\\/g, '/')
}