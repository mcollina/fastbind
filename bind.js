'use strict'

var reusify = require('reusify')

function fastbind (dest) {
  var queue = reusify(Holder)
  return bind

  function bind (that) {
    var holder = queue.get()
    holder.bound = that
    return holder.wrapper
  }

  function Holder () {
    this.next = null
    this.bound = null
    var that = this
    this.wrapper = function wrapper () {
      var bound = that.bound
      switch (arguments.length) {
        case 0:
          dest.call(bound)
          break
        case 1:
          dest.call(bound, arguments[0])
          break
        case 2:
          dest.call(bound, arguments[0], arguments[1])
          break
        case 3:
          dest.call(bound, arguments[0], arguments[1], arguments[2])
          break
        case 4:
          dest.call(bound, arguments[0], arguments[1], arguments[2], arguments[3])
          break
        case 5:
          dest.call(bound, arguments[0], arguments[1], arguments[2], arguments[3], arguments[4])
          break
        default:
          dest.apply(bound, arguments)
          break
      }
      that.bound = null
      queue.release(that)
    }
  }
}

function noop () {}

module.exports = fastbind
