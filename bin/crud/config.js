import yargs from "yargs"
import { readFile, writeFile } from "node:fs/promises"
import path from 'node:path'
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url) // ESModule only
const __dirname = path.dirname(__filename) // ESModule only
const configPath = path.resolve(__dirname, '../config/config.json') // config.json path

export const readConfig = async () => {
  try {
    return JSON.parse(await readFile(configPath, 'utf8'))
  } catch (error) {
    yargs.exit(1, error)
  }
}

export const writeConfig = async (config) => {
  try {
    await writeFile(configPath, JSON.stringify(config, null, 2), 'utf8')
  } catch (error) {
    yargs.exit(1, error)
  }
}