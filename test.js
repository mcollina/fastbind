'use strict'

var test = require('tape')
var fastbind = require('./')

test('binds to that with args', function (t) {
  t.plan(4)

  var bind = fastbind()
  var obj = {}

  bind(myFunc, obj, 1, 2, 3)()

  function myFunc (a, b, c) {
    t.same(this, obj, 'this is set')
    t.equal(a, 1, 'first arg is set')
    t.equal(b, 2, 'second arg is set')
    t.equal(c, 3, 'third arg is set')
  }
})

test('forwards the params', function (t) {
  t.plan(4)

  var bind = fastbind()
  var obj = {}

  bind(myFunc, obj)(1, 2, 3)

  function myFunc (a, b, c) {
    t.same(this, obj, 'this is set')
    t.equal(a, 1, 'first arg is set')
    t.equal(b, 2, 'second arg is set')
    t.equal(c, 3, 'third arg is set')
  }
})

test('binds to a null this with args', function (t) {
  t.plan(4)

  var bind = fastbind()
  var obj = {}

  bind(myFunc, null, 1, 2, 3)()

  function myFunc (a, b, c) {
    t.equal(this, null, 'this is null')
    t.equal(a, 1, 'first arg is set')
    t.equal(b, 2, 'second arg is set')
    t.equal(c, 3, 'third arg is set')
  }
})

test('forwards the params with a null this', function (t) {
  t.plan(4)

  var bind = fastbind()
  var obj = {}

  bind(myFunc, null, 1)(2, 3)

  function myFunc (a, b, c) {
    t.equal(this, null, 'this is null')
    t.equal(a, 1, 'first arg is set')
    t.equal(b, 2, 'second arg is set')
    t.equal(c, 3, 'third arg is set')
  }
})
