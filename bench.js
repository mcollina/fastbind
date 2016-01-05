'use strict'

var bench = require('fastbench')
var reusify = require('reusify')
var bind = require('./')(aaState)
var queue = reusify(Holder)

function benchFunc (cb) {
  var a = 42
  setImmediate(function (b) {
    aa(a, b, cb)
  }, 24)
}

function benchBind (cb) {
  var a = 42
  setImmediate(aa.bind(null, a, 24), cb)
}

function benchReusify (cb) {
  var state = queue.get()
  state.a = 42
  state.cb = cb
  setImmediate(state.wrapper, 24)
}

function benchFastBind (cb) {
  var state = new State(42, cb)
  setImmediate(bind(state), 24)
}

function aa (a, b, cb) {
  a + b
  cb()
}

function State (a, cb) {
  this.a = a
  this.cb = cb
}

function aaState (b) {
  var a = this.a
  var cb = this.cb
  a + b
  cb()
}

function Holder () {
  this.next = null
  this.a = 0
  this.cb = null
  var that = this
  this.wrapper = function (b) {
    var a = that.a
    var cb = that.cb
    a + b
    cb()
    this.a = 0
    this.cb = noop
    queue.release(that)
  }
}

function noop () {}

var run = bench([
  benchReusify,
  benchFunc,
  benchBind,
  benchFastBind,
], 1000000)

run(run)
