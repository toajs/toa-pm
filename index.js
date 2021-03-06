'use strict'
// **Github:** https://github.com/toajs/toa-pm
//
// **License:** MIT

module.exports = function (app, handle) {
  handle = handle || defaultHandle
  if (typeof handle === 'function') handle = {message: handle}

  const events = Object.keys(handle)
  const bindHanles = {}

  events.forEach((event) => {
    bindHanles[event] = handle[event].bind(app)
    process.on(event, bindHanles[event])
  })

  app.server.once('close', function () {
    events.forEach((event) => process.removeListener(event, bindHanles[event]))
  })
}

/**
 * Default handle accept a 'shutdown' message to stop from accepting new connections and keeps existing connections.
 * The server is finally closed and exit gracefully when all connections are ended.
 * For example: `pm2 gracefulReload app`
 */
function defaultHandle (message) {
  if (message === 'shutdown') {
    this.server.close(() => process.exit(0))
  }
}
