import path from 'node:path'
import { readFile, writeFile } from "node:fs/promises"

export const readcrf = async (path) => {
  let string = await readFile(path, 'utf8')
  if (string) {
    return JSON.parse(string)
  } else {
    return null
  }
}

export const writecrf = async (path, obj) => {
  await writeFile(path, JSON.stringify(obj, null, 2))
}