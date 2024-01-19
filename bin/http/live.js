import { serstart } from './server.js'
import { watcher } from './change.js'

const LiveServer = {
  server: null,
  watcher: null,
  shutdown: null
}

LiveServer.server = serstart
LiveServer.watcher = watcher
LiveServer.shutdown = () => {
  if (LiveServer.server) {
    LiveServer.server.close()
  }
  if (LiveServer.watcher) {
    LiveServer.watcher.close()
  }
}

export default LiveServer