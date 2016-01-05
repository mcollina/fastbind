# fastbind&nbsp;&nbsp;[![Build Status](https://travis-ci.org/mcollina/fastbind.svg)](https://travis-ci.org/mcollina/fastbind)

Bind a function to an Object ludicrously fast.

__This is not a replacement for Function#bind, as it does not support
arguments on `bind()` for performance reasons.__ Also, each bound
function is throw away, you cannot reuse them.

It is 250% faster than `bind()`, and 5-10% faster than the fastest code
you can write (see [alternatives](#alternatives)).

You want to use this library when you need to pass some state to a
callback in a super-hot code path.

## Install

```
npm i fastbind --save
```

## Usage

```js
var bind = require('fastbind')(sum)

function State (a) {
  this.a = a
}

function sum (b) {
  var a = this.a
  console.log(a + b)
}

var state = new State(42)
setImmediate(bind(state), 24)
```

## Alternatives

The other best method for achieving similar performance is:

```js
var a = 42
setImmediate(function (b) {
  aa(a, b)
}, 24)

function sum (a, b) {
  console.log(a + b)
}
```

This is 5-10% slower than fastbind. You decide if fastbind is worth it
or not.

## Acknowledgements

fastbind is sponsored by [nearForm](http://nearform.com).

## License

MIT
