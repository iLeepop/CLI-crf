import express from 'express'
import path from 'node:path'
import fs from 'node:fs'
import url from 'node:url'
import send from 'send'
import es from 'event-stream'
import serveIndex from 'serve-index'
import escapeHTML from '../util/escape.js'

import { __dirname, pwd } from './pwd.js'

export const rootStatic = express.static(pwd)
export const rootIndex = serveIndex(pwd, { 'icons': true })

const INJECT_CODE = fs.readFileSync(path.join(__dirname, '../template/INJECT.html'), 'utf8')
function staticServer(pwd) {
  let isFile = false
  try {
    isFile = fs.statSync(pwd).isFile()
  } catch (e) {
    throw e
  }
  return function (req, res, next) {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next()
    let reqpath = isFile ? '' : url.parse(req.url).pathname
    let hasNoOrigin = !req.headers.origin
    var injectCandidates = [new RegExp("</body>", "i"), new RegExp("</svg>"), new RegExp("</head>", "i")]
    var injectTag = null

    function directory() {
      let pathname = url.parse(req.url).pathname
      res.statusCode = 301
      res.setHeader('Location', pathname + '/')
      res.end('Redirecting to ' + escapeHTML(pathname) + '/')
    }

    function file(filepath) {
      let ex = path.extname(filepath).toLocaleLowerCase(), match,
        possibleExtensions = ['', '.html', '.htm', '.xhtml', '.php', '.svg']
      if (hasNoOrigin && (possibleExtensions.indexOf(ex) > -1)) {
        let content = fs.readFileSync(filepath, 'utf8')
        for (let i = 0; i < injectCandidates.length; ++i) {
          match = injectCandidates[i].exec(content)
          if (match) {
            injectTag = match[0]
            break;
          }
        }
        if (injectTag === null) {
          console.warn('cant find any of the tags ', injectCandidates, 'from', filepath)
        }
      }
    }

    function error(err) {
      if (err.status === 404) return next();
      next(err);
    }

    function inject(stream) {
      if (injectTag) {
        let len = INJECT_CODE.length + res.getHeader('Content-Length')
        res.setHeader('Content-Length', len)
        let originalPipe = stream.pipe
        stream.pipe = function (res) {
          originalPipe.call(stream, es.replace(new RegExp(injectTag, 'i'), INJECT_CODE + injectTag)).pipe(res)
        }
      }
    }

    send(req, reqpath, { root: pwd })
      .on('error', error)
      .on('directory', directory)
      .on('file', file)
      .on('stream', inject)
      .pipe(res)
  }
}

export const staticHandler = staticServer(pwd)