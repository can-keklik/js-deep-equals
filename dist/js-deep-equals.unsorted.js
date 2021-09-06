"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    var _require = require('./src/unsorted'),
        compareUnsorted = _require.compareUnsorted,
        hashUnsorted = _require.hashUnsorted;

    window.jsDeepEquals = {
      compareUnsorted: compareUnsorted,
      hashUnsorted: hashUnsorted
    };
  }, { "./src/unsorted": 3 }], 2: [function (require, module, exports) {
    (function () {
      var _global = this;

      function MurmurHashV2(str, seed) {
        var l = str.length,
            h = seed ^ l,
            i = 0,
            k;

        while (l >= 4) {
          k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;

          k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
          k ^= k >>> 24;
          k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);

          h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;

          l -= 4;
          ++i;
        }

        switch (l) {
          case 3:
            h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
          case 2:
            h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
          case 1:
            h ^= str.charCodeAt(i) & 0xff;
            h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
        }

        h ^= h >>> 13;
        h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
        h ^= h >>> 15;

        return h >>> 0;
      };

      function MurmurHashV3(key, seed) {
        var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;

        remainder = key.length & 3;
        bytes = key.length - remainder;
        h1 = seed;
        c1 = 0xcc9e2d51;
        c2 = 0x1b873593;
        i = 0;

        while (i < bytes) {
          k1 = key.charCodeAt(i) & 0xff | (key.charCodeAt(++i) & 0xff) << 8 | (key.charCodeAt(++i) & 0xff) << 16 | (key.charCodeAt(++i) & 0xff) << 24;
          ++i;

          k1 = (k1 & 0xffff) * c1 + (((k1 >>> 16) * c1 & 0xffff) << 16) & 0xffffffff;
          k1 = k1 << 15 | k1 >>> 17;
          k1 = (k1 & 0xffff) * c2 + (((k1 >>> 16) * c2 & 0xffff) << 16) & 0xffffffff;

          h1 ^= k1;
          h1 = h1 << 13 | h1 >>> 19;
          h1b = (h1 & 0xffff) * 5 + (((h1 >>> 16) * 5 & 0xffff) << 16) & 0xffffffff;
          h1 = (h1b & 0xffff) + 0x6b64 + (((h1b >>> 16) + 0xe654 & 0xffff) << 16);
        }

        k1 = 0;

        switch (remainder) {
          case 3:
            k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
          case 2:
            k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
          case 1:
            k1 ^= key.charCodeAt(i) & 0xff;

            k1 = (k1 & 0xffff) * c1 + (((k1 >>> 16) * c1 & 0xffff) << 16) & 0xffffffff;
            k1 = k1 << 15 | k1 >>> 17;
            k1 = (k1 & 0xffff) * c2 + (((k1 >>> 16) * c2 & 0xffff) << 16) & 0xffffffff;
            h1 ^= k1;
        }

        h1 ^= key.length;

        h1 ^= h1 >>> 16;
        h1 = (h1 & 0xffff) * 0x85ebca6b + (((h1 >>> 16) * 0x85ebca6b & 0xffff) << 16) & 0xffffffff;
        h1 ^= h1 >>> 13;
        h1 = (h1 & 0xffff) * 0xc2b2ae35 + (((h1 >>> 16) * 0xc2b2ae35 & 0xffff) << 16) & 0xffffffff;
        h1 ^= h1 >>> 16;

        return h1 >>> 0;
      }

      var murmur = MurmurHashV3;
      murmur.v2 = MurmurHashV2;
      murmur.v3 = MurmurHashV3;

      if (typeof module != 'undefined') {
        module.exports = murmur;
      } else {
        var _previousRoot = _global.murmur;
        murmur.noConflict = function () {
          _global.murmur = _previousRoot;
          return murmur;
        };
        _global.murmur = murmur;
      }
    })();
  }, {}], 3: [function (require, module, exports) {
    var _require2 = require('murmurhash'),
        hash = _require2.v3;

    var EMPTY_OBJECT = '__empty__obj';
    var EMPTY_ARRAY = '__empty__arr';

    var Node = function Node() {
      _classCallCheck(this, Node);

      this.children = [];
      this.hash = 0;
    };

    var hasher = function hasher(thing) {
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      var stringThing = prefix + (typeof thing === "undefined" ? "undefined" : _typeof(thing)) + '::' + thing;
      return hash(stringThing);
    };

    var combineHashes = function combineHashes(parentHash, child) {
      return parentHash + child.hash & 0xFFFFFFFF;
    };

    var newNode = function newNode(thing, prefix) {
      var node = new Node();
      node.hash = hasher(thing, prefix);
      return node;
    };

    var createTree = function createTree(currNode, currentInput) {
      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      var isObject = (typeof currentInput === "undefined" ? "undefined" : _typeof(currentInput)) === 'object';
      var isNil = currentInput === null || typeof currentInput === 'undefined';
      var isArray = Array.isArray(currentInput);
      var keys = !isNil ? Object.keys(currentInput) : [];

      if (currentInput instanceof Date || currentInput instanceof RegExp) {
        return newNode(currentInput, prefix);
      }

      if (!isObject && !isArray) {
        return newNode(currentInput, prefix);
      }

      if (!keys.length) {
        return isArray ? newNode(EMPTY_ARRAY, prefix) : newNode(EMPTY_OBJECT, prefix);
      }
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        var _prefix = void 0;
        if (!isArray && isObject) {
          _prefix = key;
        }

        var node = createTree(new Node(), currentInput[key], _prefix);
        currNode.children.push(node);
      }

      var combined = currNode.children.reduce(combineHashes, 0);
      currNode.hash = hasher(combined, prefix);
      return currNode;
    };

    var createFinalHash = function createFinalHash(input) {
      var tree = createTree(new Node(), input);
      return tree.hash;
    };

    var compareUnsorted = function compareUnsorted(a, b) {
      if (a && b && (Array.isArray(a) && Array.isArray(b) || (typeof a === "undefined" ? "undefined" : _typeof(a)) === 'object' && (typeof b === "undefined" ? "undefined" : _typeof(b)) === 'object') && a.length === b.length) {
        return createFinalHash(a) === createFinalHash(b);
      }
      return false;
    };

    module.exports = {
      compareUnsorted: compareUnsorted,
      hashUnsorted: createFinalHash
    };
  }, { "murmurhash": 2 }] }, {}, [1]);
