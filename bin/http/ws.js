import WebSocket from "faye-websocket"

export let clients = []
export function createWebSocket(req, socket, head) {
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
        }, 1000)
      }
    }())
  ws.onclose = function () {
    clients = clients.filter(function (s) {
      return s !== ws
    })
  }
  clients.push(ws)
}