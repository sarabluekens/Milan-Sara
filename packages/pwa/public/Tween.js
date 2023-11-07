var _Group = function () {
  ;(this._tweens = {}), (this._tweensAddedDuringUpdate = {})
}
_Group.prototype = {
  getAll: function () {
    return Object.keys(this._tweens).map(
      function (t) {
        return this._tweens[t]
      }.bind(this),
    )
  },
  removeAll: function () {
    this._tweens = {}
  },
  add: function (t) {
    ;(this._tweens[t.getId()] = t),
      (this._tweensAddedDuringUpdate[t.getId()] = t)
  },
  remove: function (t) {
    delete this._tweens[t.getId()],
      delete this._tweensAddedDuringUpdate[t.getId()]
  },
  update: function (t, n) {
    var e = Object.keys(this._tweens)
    if (0 === e.length) return !1
    for (t = void 0 !== t ? t : TWEEN.now(); e.length > 0; ) {
      this._tweensAddedDuringUpdate = {}
      for (var i = 0; i < e.length; i++) {
        var r = this._tweens[e[i]]
        r &&
          !1 === r.update(t) &&
          ((r._isPlaying = !1), n || delete this._tweens[e[i]])
      }
      e = Object.keys(this._tweensAddedDuringUpdate)
    }
    return !0
  },
}
var TWEEN = new _Group()
;(TWEEN.Group = _Group),
  (TWEEN._nextId = 0),
  (TWEEN.nextId = function () {
    return TWEEN._nextId++
  }),
  'undefined' == typeof window && 'undefined' != typeof process
    ? (TWEEN.now = function () {
        var t = process.hrtime()
        return 1e3 * t[0] + t[1] / 1e6
      })
    : 'undefined' != typeof window &&
      void 0 !== window.performance &&
      void 0 !== window.performance.now
    ? (TWEEN.now = window.performance.now.bind(window.performance))
    : void 0 !== Date.now
    ? (TWEEN.now = Date.now)
    : (TWEEN.now = function () {
        return new Date().getTime()
      }),
  (TWEEN.Tween = function (t, n) {
    ;(this._object = t),
      (this._valuesStart = {}),
      (this._valuesEnd = {}),
      (this._valuesStartRepeat = {}),
      (this._duration = 1e3),
      (this._repeat = 0),
      (this._repeatDelayTime = void 0),
      (this._yoyo = !1),
      (this._isPlaying = !1),
      (this._reversed = !1),
      (this._delayTime = 0),
      (this._startTime = null),
      (this._easingFunction = TWEEN.Easing.Linear.None),
      (this._interpolationFunction = TWEEN.Interpolation.Linear),
      (this._chainedTweens = []),
      (this._onStartCallback = null),
      (this._onStartCallbackFired = !1),
      (this._onUpdateCallback = null),
      (this._onCompleteCallback = null),
      (this._onStopCallback = null),
      (this._group = n || TWEEN),
      (this._id = TWEEN.nextId())
  }),
  (TWEEN.Tween.prototype = {
    getId: function () {
      return this._id
    },
    isPlaying: function () {
      return this._isPlaying
    },
    to: function (t, n) {
      return (this._valuesEnd = t), void 0 !== n && (this._duration = n), this
    },
    start: function (t) {
      this._group.add(this),
        (this._isPlaying = !0),
        (this._onStartCallbackFired = !1),
        (this._startTime =
          void 0 !== t
            ? 'string' == typeof t
              ? TWEEN.now() + parseFloat(t)
              : t
            : TWEEN.now()),
        (this._startTime += this._delayTime)
      for (var n in this._valuesEnd) {
        if (this._valuesEnd[n] instanceof Array) {
          if (0 === this._valuesEnd[n].length) continue
          this._valuesEnd[n] = [this._object[n]].concat(this._valuesEnd[n])
        }
        void 0 !== this._object[n] &&
          ((this._valuesStart[n] = this._object[n]),
          this._valuesStart[n] instanceof Array == !1 &&
            (this._valuesStart[n] *= 1),
          (this._valuesStartRepeat[n] = this._valuesStart[n] || 0))
      }
      return this
    },
    stop: function () {
      return this._isPlaying
        ? (this._group.remove(this),
          (this._isPlaying = !1),
          null !== this._onStopCallback && this._onStopCallback(this._object),
          this.stopChainedTweens(),
          this)
        : this
    },
    end: function () {
      return this.update(this._startTime + this._duration), this
    },
    stopChainedTweens: function () {
      for (var t = 0, n = this._chainedTweens.length; t < n; t++)
        this._chainedTweens[t].stop()
    },
    group: function (t) {
      return (this._group = t), this
    },
    delay: function (t) {
      return (this._delayTime = t), this
    },
    repeat: function (t) {
      return (this._repeat = t), this
    },
    repeatDelay: function (t) {
      return (this._repeatDelayTime = t), this
    },
    yoyo: function (t) {
      return (this._yoyo = t), this
    },
    easing: function (t) {
      return (this._easingFunction = t), this
    },
    interpolation: function (t) {
      return (this._interpolationFunction = t), this
    },
    chain: function () {
      return (this._chainedTweens = arguments), this
    },
    onStart: function (t) {
      return (this._onStartCallback = t), this
    },
    onUpdate: function (t) {
      return (this._onUpdateCallback = t), this
    },
    onComplete: function (t) {
      return (this._onCompleteCallback = t), this
    },
    onStop: function (t) {
      return (this._onStopCallback = t), this
    },
    update: function (t) {
      var n, e, i
      if (t < this._startTime) return !0
      !1 === this._onStartCallbackFired &&
        (null !== this._onStartCallback && this._onStartCallback(this._object),
        (this._onStartCallbackFired = !0)),
        (e = (t - this._startTime) / this._duration),
        (e = 0 === this._duration || e > 1 ? 1 : e),
        (i = this._easingFunction(e))
      for (n in this._valuesEnd)
        if (void 0 !== this._valuesStart[n]) {
          var r = this._valuesStart[n] || 0,
            a = this._valuesEnd[n]
          a instanceof Array
            ? (this._object[n] = this._interpolationFunction(a, i))
            : ('string' == typeof a &&
                (a =
                  '+' === a.charAt(0) || '-' === a.charAt(0)
                    ? r + parseFloat(a)
                    : parseFloat(a)),
              'number' == typeof a && (this._object[n] = r + (a - r) * i))
        }
      if (
        (null !== this._onUpdateCallback &&
          this._onUpdateCallback(this._object),
        1 === e)
      ) {
        if (this._repeat > 0) {
          isFinite(this._repeat) && this._repeat--
          for (n in this._valuesStartRepeat) {
            if (
              ('string' == typeof this._valuesEnd[n] &&
                (this._valuesStartRepeat[n] =
                  this._valuesStartRepeat[n] + parseFloat(this._valuesEnd[n])),
              this._yoyo)
            ) {
              var s = this._valuesStartRepeat[n]
              ;(this._valuesStartRepeat[n] = this._valuesEnd[n]),
                (this._valuesEnd[n] = s)
            }
            this._valuesStart[n] = this._valuesStartRepeat[n]
          }
          return (
            this._yoyo && (this._reversed = !this._reversed),
            void 0 !== this._repeatDelayTime
              ? (this._startTime = t + this._repeatDelayTime)
              : (this._startTime = t + this._delayTime),
            !0
          )
        }
        null !== this._onCompleteCallback &&
          this._onCompleteCallback(this._object)
        for (var o = 0, u = this._chainedTweens.length; o < u; o++)
          this._chainedTweens[o].start(this._startTime + this._duration)
        return !1
      }
      return !0
    },
  }),
  (TWEEN.Easing = {
    Linear: {
      None: function (t) {
        return t
      },
    },
    Quadratic: {
      In: function (t) {
        return t * t
      },
      Out: function (t) {
        return t * (2 - t)
      },
      InOut: function (t) {
        return (t *= 2) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1)
      },
    },
    Cubic: {
      In: function (t) {
        return t * t * t
      },
      Out: function (t) {
        return --t * t * t + 1
      },
      InOut: function (t) {
        return (t *= 2) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2)
      },
    },
    Quartic: {
      In: function (t) {
        return t * t * t * t
      },
      Out: function (t) {
        return 1 - --t * t * t * t
      },
      InOut: function (t) {
        return (t *= 2) < 1
          ? 0.5 * t * t * t * t
          : -0.5 * ((t -= 2) * t * t * t - 2)
      },
    },
    Quintic: {
      In: function (t) {
        return t * t * t * t * t
      },
      Out: function (t) {
        return --t * t * t * t * t + 1
      },
      InOut: function (t) {
        return (t *= 2) < 1
          ? 0.5 * t * t * t * t * t
          : 0.5 * ((t -= 2) * t * t * t * t + 2)
      },
    },
    Sinusoidal: {
      In: function (t) {
        return 1 - Math.cos((t * Math.PI) / 2)
      },
      Out: function (t) {
        return Math.sin((t * Math.PI) / 2)
      },
      InOut: function (t) {
        return 0.5 * (1 - Math.cos(Math.PI * t))
      },
    },
    Exponential: {
      In: function (t) {
        return 0 === t ? 0 : Math.pow(1024, t - 1)
      },
      Out: function (t) {
        return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
      },
      InOut: function (t) {
        return 0 === t
          ? 0
          : 1 === t
          ? 1
          : (t *= 2) < 1
          ? 0.5 * Math.pow(1024, t - 1)
          : 0.5 * (2 - Math.pow(2, -10 * (t - 1)))
      },
    },
    Circular: {
      In: function (t) {
        return 1 - Math.sqrt(1 - t * t)
      },
      Out: function (t) {
        return Math.sqrt(1 - --t * t)
      },
      InOut: function (t) {
        return (t *= 2) < 1
          ? -0.5 * (Math.sqrt(1 - t * t) - 1)
          : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
      },
    },
    Elastic: {
      In: function (t) {
        return 0 === t
          ? 0
          : 1 === t
          ? 1
          : -Math.pow(2, 10 * (t - 1)) * Math.sin(5 * (t - 1.1) * Math.PI)
      },
      Out: function (t) {
        return 0 === t
          ? 0
          : 1 === t
          ? 1
          : Math.pow(2, -10 * t) * Math.sin(5 * (t - 0.1) * Math.PI) + 1
      },
      InOut: function (t) {
        return 0 === t
          ? 0
          : 1 === t
          ? 1
          : (t *= 2) < 1
          ? -0.5 * Math.pow(2, 10 * (t - 1)) * Math.sin(5 * (t - 1.1) * Math.PI)
          : 0.5 *
              Math.pow(2, -10 * (t - 1)) *
              Math.sin(5 * (t - 1.1) * Math.PI) +
            1
      },
    },
    Back: {
      In: function (t) {
        return t * t * (2.70158 * t - 1.70158)
      },
      Out: function (t) {
        return --t * t * (2.70158 * t + 1.70158) + 1
      },
      InOut: function (t) {
        var n = 2.5949095
        return (t *= 2) < 1
          ? t * t * ((n + 1) * t - n) * 0.5
          : 0.5 * ((t -= 2) * t * ((n + 1) * t + n) + 2)
      },
    },
    Bounce: {
      In: function (t) {
        return 1 - TWEEN.Easing.Bounce.Out(1 - t)
      },
      Out: function (t) {
        return t < 1 / 2.75
          ? 7.5625 * t * t
          : t < 2 / 2.75
          ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
          : t < 2.5 / 2.75
          ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
          : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375
      },
      InOut: function (t) {
        return t < 0.5
          ? 0.5 * TWEEN.Easing.Bounce.In(2 * t)
          : 0.5 * TWEEN.Easing.Bounce.Out(2 * t - 1) + 0.5
      },
    },
  }),
  (TWEEN.Interpolation = {
    Linear: function (t, n) {
      var e = t.length - 1,
        i = e * n,
        r = Math.floor(i),
        a = TWEEN.Interpolation.Utils.Linear
      return n < 0
        ? a(t[0], t[1], i)
        : n > 1
        ? a(t[e], t[e - 1], e - i)
        : a(t[r], t[r + 1 > e ? e : r + 1], i - r)
    },
    Bezier: function (t, n) {
      for (
        var e = 0,
          i = t.length - 1,
          r = Math.pow,
          a = TWEEN.Interpolation.Utils.Bernstein,
          s = 0;
        s <= i;
        s++
      )
        e += r(1 - n, i - s) * r(n, s) * t[s] * a(i, s)
      return e
    },
    CatmullRom: function (t, n) {
      var e = t.length - 1,
        i = e * n,
        r = Math.floor(i),
        a = TWEEN.Interpolation.Utils.CatmullRom
      return t[0] === t[e]
        ? (n < 0 && (r = Math.floor((i = e * (1 + n)))),
          a(t[(r - 1 + e) % e], t[r], t[(r + 1) % e], t[(r + 2) % e], i - r))
        : n < 0
        ? t[0] - (a(t[0], t[0], t[1], t[1], -i) - t[0])
        : n > 1
        ? t[e] - (a(t[e], t[e], t[e - 1], t[e - 1], i - e) - t[e])
        : a(
            t[r ? r - 1 : 0],
            t[r],
            t[e < r + 1 ? e : r + 1],
            t[e < r + 2 ? e : r + 2],
            i - r,
          )
    },
    Utils: {
      Linear: function (t, n, e) {
        return (n - t) * e + t
      },
      Bernstein: function (t, n) {
        var e = TWEEN.Interpolation.Utils.Factorial
        return e(t) / e(n) / e(t - n)
      },
      Factorial: (function () {
        var t = [1]
        return function (n) {
          var e = 1
          if (t[n]) return t[n]
          for (var i = n; i > 1; i--) e *= i
          return (t[n] = e), e
        }
      })(),
      CatmullRom: function (t, n, e, i, r) {
        var a = 0.5 * (e - t),
          s = 0.5 * (i - n),
          o = r * r
        return (
          (2 * n - 2 * e + a + s) * (r * o) +
          (-3 * n + 3 * e - 2 * a - s) * o +
          a * r +
          n
        )
      },
    },
  }),
  (function (t) {
    'function' == typeof define && define.amd
      ? define([], function () {
          return TWEEN
        })
      : 'undefined' != typeof module && 'object' == typeof exports
      ? (module.exports = TWEEN)
      : void 0 !== t && (t.TWEEN = TWEEN)
  })(this)
