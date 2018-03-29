/**
 * MIT License
 * 
 * Copyright (c) 2018 UnQuez
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const express = require('express')
    , bodyParser = require('body-parser')
    , path = require('path')
    , DostaqEngine = require('../engine')

module.exports = Dostaq

/**
 * Represents a Dostaq
 * 
 * @constructor
 * @param {object} opts 
 */
function Dostaq(opts) {
  this._initialize(opts || {})
}

/**
 * Initializing Dostaq
 * 
 * @param {object} opts 
 */
Dostaq.prototype._initialize = function(opts) {
  this.opts = Object.assign(Dostaq.DEFAULTS, opts)
  this._express = express()
}

/**
 * Run Dostaq
 * 
 * @param {function} fn 
 */
Dostaq.prototype.run = function(fn) {
  let viewPath = path.join(path.dirname(require.main.filename), this.opts.appViews)

  this._createEngine(viewPath, this.opts.liquid)
      .then(() => {
        this._express
          .engine('liquid', this.engine.express())
          .set('views', viewPath)
          .set('view engine', 'liquid')
        fn()
      })
      .catch(function(err) {
        fn(err)
      })
}

/**
 * Initializing view engine
 * 
 * @param   {string}  viewPath 
 * @param   {object}  conf 
 * @returns {Promise}
 */
Dostaq.prototype._createEngine = function(viewPath, liquidOpt) {
  liquidOpt = liquidOpt || {}

  this.engine = new DostaqEngine(viewPath, liquidOpt.conf)

  let plugins = {
      Filter: liquidOpt.filters, 
      Tag: liquidOpt.tags
    }
    , promises = []
  
  
  for (let k in plugins) {
    let plugin = plugins[k]

    // Check if plugin is an array
    if (plugin && ([]).constructor == plugin.constructor) {
      for (let j=0;j<plugin.length;j++) {
        promises.push(this.engine['register' + k](plugin[j]))
      }
    } else {
      continue
    }
  }
  
  return Promise.all(promises)
}
// Default configuration
Dostaq.DEFAULTS = {
  appPath: './app',
  appPort: 3000,
  appViews: './views',
  routeMode: 'queryString'
}
