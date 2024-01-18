import express from 'express'
import path from 'node:path'
import { fileURLToPath } from "node:url"
import serveIndex from 'serve-index'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const pwd = path.resolve(__dirname, process.cwd())

export const rootStatic = express.static(pwd)
export const rootIndex = serveIndex(pwd, { 'icons': true })