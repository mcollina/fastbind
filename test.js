'use strict'

var test = require('tape')
var fastbind = require('./')

test('binds to that with no args', function (t) {
  t.plan(2)

  var bind = fastbind(myFunc)
  var obj = {}

  bind(obj)()

  function myFunc () {
    t.same(this, obj, 'this is set')
    t.equal(arguments.length, 0, 'no arguments')
  }
})

test('forwards the params', function (t) {
  t.plan(4)

  var bind = fastbind(myFunc)
  var obj = {}

  bind(obj)(1, 2, 3)

  function myFunc (a, b, c) {
    t.same(this, obj, 'this is set')
    t.equal(a, 1, 'first arg is set')
    t.equal(b, 2, 'second arg is set')
    t.equal(c, 3, 'third arg is set')
  }
})
