"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;if (!f && c) return c(i, !0);if (u) return u(i, !0);var a = new Error("Cannot find module '" + i + "'");throw a.code = "MODULE_NOT_FOUND", a;
        }var p = n[i] = { exports: {} };e[i][0].call(p.exports, function (r) {
          var n = e[i][1][r];return o(n || r);
        }, p, p.exports, r, e, n, t);
      }return n[i].exports;
    }for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
      o(t[i]);
    }return o;
  }return r;
})()({ 1: [function (require, module, exports) {
    window.jsDeepEquals = {
      compare: require('./src/sorted')
    };
  }, { "./src/sorted": 2 }], 2: [function (require, module, exports) {
    var compareObjects = function compareObjects(arr1, arr2) {
      if (Array.isArray(arr1) && Array.isArray(arr2)) {
        if (arr1.length !== arr2.length) return false;
      }

      var keys = Object.keys(arr1);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (Array.isArray(arr1[key])) {
          if (Array.isArray(arr2[key])) {
            if (!compare(arr1[key], arr2[key])) return false;

            continue;
          }

          return false;
        }

        if (arr1[key] instanceof Date) {
          if (arr2[key] instanceof Date) {
            if (arr1[key].valueOf() !== arr2[key].valueOf()) return false;
            continue;
          }
          return false;
        }

        if (arr1[key] instanceof RegExp) {
          if (arr2[key] instanceof RegExp) {
            if (arr1[key].toString() !== arr2[key].toString()) return false;
            continue;
          }
          return false;
        }

        if (_typeof(arr1[key]) === 'object') {
          if (_typeof(arr2[key]) === 'object' && !Array.isArray(arr2[key])) {
            if (!compare(arr1[key], arr2[key])) return false;
            continue;
          }

          return false;
        }

        if (arr1[key] !== arr2[key]) return false;
      }

      return true;
    };

    var compare = function compare(a, b) {
      if (a && b && (Array.isArray(a) && Array.isArray(b) || (typeof a === "undefined" ? "undefined" : _typeof(a)) === 'object' && (typeof b === "undefined" ? "undefined" : _typeof(b)) === 'object') && a.length === b.length) {
        return compareObjects(a, b);
      }
      return false;
    };

    module.exports = compare;
  }, {}] }, {}, [1]);
