# toa-pm

Process events manager for toa.

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

## [toa](https://github.com/toajs/toa)

### Example

**Demo 1, with `defaultHandle`:**

```js
const Toa = require('toa')
const pm = require('toa-pm')

const app = new Toa()
app.use(function() {
  this.body = 'Hello world!'
})

app.listen(3000)
pm(app)
```

**Demo 2:**

```js
const Toa = require('toa')
const pm = require('toa-pm')

const app = new Toa()
app.use(function() {
  this.body = 'Hello world!'
})

app.listen(3000)

pm(app, function(message) {
  // the context is `app`
  if (message === 'shutdown') {
    // do some thing....
  } else {
    // ...
  }
})
```

**Demo 3:**

```js
const Toa = require('toa')
const pm = require('toa-pm')

const app = new Toa()
app.use(function() {
  this.body = 'Hello world!'
})

app.listen(3000)

pm(app, {
  message: function(message) {
    // the context is `app`
    if (message === 'shutdown') {
      // do some thing....
    } else {
      // ...
    }
  },
  beforeExit: function() {
    // do some thing.... when process emit `beforeExit` event
  }
})
```

## Installation

```bash
npm install toa-pm
```

## API

```js
const pm = require('toa-pm')
```

### pm(app[, handle])

It will add `handle` to `process`'s `message` event, or add one more  `event-handle` to `process`. ** Use it after `app.listen` **

- `app`: Toa application.
- `handle`: {Function|Object}, if omit `handle`, the default handle will be used:

  ```js
  function defaultHandle(message) {
    if (message === 'shutdown') {
      this.server.close(() => process.exit(0))
    }
  }
  ```

  Default handle accept a 'shutdown' message to stop from accepting new connections and keeps existing connections. The server is finally closed and exit gracefully when all connections are ended. For example: `pm2 gracefulReload app`

## License

The MIT License (MIT)

[npm-url]: https://npmjs.org/package/toa-pm
[npm-image]: http://img.shields.io/npm/v/toa-pm.svg

[travis-url]: https://travis-ci.org/toajs/toa-pm
[travis-image]: http://img.shields.io/travis/toajs/toa-pm.svg

[downloads-url]: https://npmjs.org/package/toa-pm
[downloads-image]: http://img.shields.io/npm/dm/toa-pm.svg?style=flat-square
