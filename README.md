toa-pm
====
Process events manager for toa.

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Talk topic][talk-image]][talk-url]

## [toa](https://github.com/toajs/toa)


### Example

**Demo 1, with `defaultHandle`:**
```js
var toa = require('toa');
var pm = require('toa-pm');

var app = toa(function() {
  this.body = 'Hello world!';
});

pm(app);
app.listen(3000);
```

**Demo 2:**
```js
var toa = require('toa');
var pm = require('toa-pm');

var app = toa(function() {
  this.body = 'Hello world!';
});

pm(app, function(message) {
  // the context is `app`
  if (message === 'shutdown') {
    // do some thing....
  } else {
    // ...
  }
});
app.listen(3000);
```

**Demo 3:**
```js
var toa = require('toa');
var pm = require('toa-pm');

var app = toa(function() {
  this.body = 'Hello world!';
});

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
});
app.listen(3000);
```

## Installation

```bash
npm install toa-pm
```

## API

  ```js
  var pm = require('toa-pm');
  ```
### pm(app[, handle])

It will add `handle` to `process`'s `message` event, or add one more  `event-handle` to `process`.

- `app`: Toa application.
- `handle`: {Function|Object}, if omit `handle`, the default handle will be used:

  ```js
  function defaultHandle(message) {
    if (message === 'shutdown') {
      this.server.close(function() {
        process.exit(0);
      });
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

[talk-url]: https://guest.talk.ai/rooms/a6a9331024
[talk-image]: https://img.shields.io/talk/t/a6a9331024.svg
