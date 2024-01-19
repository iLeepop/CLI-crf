import WebSocket from "faye-websocket"
import chalk from "chalk"

export let clients = []
export function createWebSocket(req, socket, head) {
  if (clients.length > 0) {
    console.log(chalk.rgb(100, 10, 50).bold('Ws already created'))
  }
  const ws = new WebSocket(req, socket, head)
  ws.onopen = function () { ws.send('connected') }
    (function () {
      let wssend = ws.send
      let waitTimeout
      ws.send = function () {
        let args = arguments
        if (waitTimeout) clearTimeout(waitTimeout)
        waitTimeout = setTimeout(function () {
          wssend.apply(ws, args)
        }, 200)
      }
    }())
  ws.onclose = function () {
    clients = clients.filter(function (s) {
      return s !== ws
    })
  }
  clients.push(ws)
}