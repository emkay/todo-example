;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var domready = require('domready');
var Queue = require('dom-queue');

var Checkbox = function () {
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    return checkbox;
};

var Item = function (content) {
    var item = document.createElement('div');
    var itemCheckbox = Checkbox();
    var label = document.createElement('label');
    var text = document.createElement('span');
    text.innerHTML = content;
    label.appendChild(itemCheckbox);
    label.appendChild(text);
    item.appendChild(label);
    return item.innerHTML;
};

domready(function () {
    var parent = document.querySelector('#list');
    var list = new Queue({
        container: 'todo-list',
        parent: parent
    });
 
    var addItemButton = document.querySelector('#add-item-form button');

    addItemButton.addEventListener('click', function (e) {
        var input = document.querySelector('#todo-input');
        var value = input.value;

        list.push(Item(value));
        input.value = '';
    });
});

},{"dom-queue":2,"domready":3}],2:[function(require,module,exports){
module.exports = Queue;

function Queue(options) {
    if (!options) {
        options = {};
    }

    this.container = options.container || 'queue';
    this.tag = options.tag || 'ul';
    this.parent = options.parent || document.body;

    if (options.childTag) {
        this.childTag = options.childTag;
    } else {
        this.childTag = this.tag === 'ul' ? 'li': 'span';
    }

    this.node = document.createElement(this.tag);
    this.node.className = this.container;
    this.parent.appendChild(this.node);
}

Queue.prototype.push = function (item) {
    var child = document.createElement(this.childTag);
    child.innerHTML = item;
    child.className = 'item';
    this.node.appendChild(child);
};

Queue.prototype.pop = function () {
    if (this.node.lastChild) {
        this.node.removeChild(this.node.lastChild);
    }
};

Queue.prototype.shift = function () {
    if (this.node.firstChild) {
        this.node.removeChild(this.node.firstChild);
    }
};

},{}],3:[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2012 - License MIT
  */
!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()
}('domready', function (ready) {

  var fns = [], fn, f = false
    , doc = document
    , testEl = doc.documentElement
    , hack = testEl.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , addEventListener = 'addEventListener'
    , onreadystatechange = 'onreadystatechange'
    , readyState = 'readyState'
    , loadedRgx = hack ? /^loaded|^c/ : /^loaded|c/
    , loaded = loadedRgx.test(doc[readyState])

  function flush(f) {
    loaded = 1
    while (f = fns.shift()) f()
  }

  doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
    doc.removeEventListener(domContentLoaded, fn, f)
    flush()
  }, f)


  hack && doc.attachEvent(onreadystatechange, fn = function () {
    if (/^c/.test(doc[readyState])) {
      doc.detachEvent(onreadystatechange, fn)
      flush()
    }
  })

  return (ready = hack ?
    function (fn) {
      self != top ?
        loaded ? fn() : fns.push(fn) :
        function () {
          try {
            testEl.doScroll('left')
          } catch (e) {
            return setTimeout(function() { ready(fn) }, 50)
          }
          fn()
        }()
    } :
    function (fn) {
      loaded ? fn() : fns.push(fn)
    })
})

},{}]},{},[1])
;