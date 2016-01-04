'use strict'

var reusify = require('reusify')

function fastbind () {
  var queue = reusify(Holder)
  return bind

  function bind () {
    var args = new Array(5)
    var count = arguments.length - 2
    for(var i = 0; i < count; i += 1) {
      args[i] = arguments[i + 2]
    }

    var that = arguments[1]
    var holder = queue.get()
    holder.args = args
    holder.dest = arguments[0]
    holder.that = that
    holder.count = count

    return holder.wrapper
  }

  function Holder () {
    this.next = null
    this.args = null
    this.dest = noop
    this.that = null
    this.count = 0
    var that = this
    this.wrapper = function wrapper () {
      var args = that.args
      var dest = that.dest
      var destThat = that.that
      var count = that.count
      var total = count + arguments.length
      that.args = null
      that.dest = noop
      that.that = null
      queue.release(that)
      for (var i = 0, l = arguments.length; i < l; i += 1) {
        args[count + i] = arguments[i]
      }
      switch (total) {
        case 1:
          dest.call(destThat, args[0])
          break
        case 2:
          dest.call(destThat, args[0], args[1])
          break
        case 3:
          dest.call(destThat, args[0], args[1], args[2])
          break
        case 4:
          dest.call(destThat, args[0], args[1], args[2], args[3])
          break
        case 5:
          dest.call(destThat, args[0], args[1], args[2], args[3], args[4])
          break
        default:
          dest.apply(destThat, args)
          break
      }
    }
  }
}

function noop () {}

module.exports = fastbind
