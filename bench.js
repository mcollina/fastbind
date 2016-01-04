'use strict'

var bench = require('fastbench')
var bind = require('./')()
var obj = {}

function benchFunc (cb) {
  var a = 42
  setImmediate(function () {
    aa(a, cb)
  })
}

function benchBind (cb) {
  var a = 42
  setImmediate(aa.bind(null, a, cb))
}

function benchFastBind (cb) {
  var a = 42
  setImmediate(bind(aa, null, a, cb))
}

function benchFuncWithThat (cb) {
  var a = 42
  setImmediate(function () {
    aa.call(obj, a, cb)
  })
}

function benchBindWithThat (cb) {
  var a = 42
  setImmediate(aa.bind(obj, a, cb))
}

function benchFastBindWithThat (cb) {
  var a = 42
  setImmediate(bind(aa, obj, a, cb))
}

function aa (a, cb) {
  a + a
  cb()
}

var run = bench([
  benchFunc,
  //benchBind,
  benchFastBind,
  //benchFuncWithThat,
  //benchBindWithThat,
  //benchFastBindWithThat
], 10000000)

run(run)
