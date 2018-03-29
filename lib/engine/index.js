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

const Liquid = require('liquidjs')
    , fs = require('fs')
    , path = require('path')

module.exports = DostaqEngine

/**
 * Represents DostaqEngine
 * 
 * @constructor
 * @param {string} viewPath
 * @param {object} conf
 */
function DostaqEngine(viewPath, conf) {
   this._initialize(viewPath, conf || {})
}

/**
 * Initializing DostaqEngine
 * 
 * @param {string} viewPath 
 * @param {object} conf 
 */
DostaqEngine.prototype._initialize = function(viewPath, conf) {
  this._engine = Liquid({
    root: viewPath,
    extname: '.liquid'
  })
  this.conf = conf 
}

/**
 * Register filter into liquidjs
 * 
 * @param   {string}  filterName 
 * @returns {Promise}
 */
DostaqEngine.prototype.registerFilter = function(filterName) {
  return this._register('filters', filterName)
}

/**
 * Register tag into liquidjs
 * 
 * @param   {string}  tagName 
 * @returns {Promise}
 */
DostaqEngine.prototype.registerTag = function(tagName) {
  return this._register('tags', tagName)
}

/**
 * Registering tag or filter into liquidjs
 * 
 * @param   {string}  dir 
 * @param   {string}  name 
 * @returns {Promise}
 */
DostaqEngine.prototype._register = function(dir, name) {
  let pluginType = this._ucfirst(dir.substr(0, dir.length - 1))
    , pluginPath = path.join(__dirname, dir, name)
    
  return new Promise((resolve, reject) => {
    fs.stat(pluginPath + '.js', (err) => {
      if (err) {
        reject(new Error(pluginType + ' ' + name + ' is not found'))
      } else {
        let plugin = require(pluginPath)

        // Check is plugin can assign a configuration
        if (this.conf[name] && plugin.conf) {
          // Assign configuration into plugin
          Object.assign(plugin.conf, this.conf[name])
        }
        
        this._engine['register' + pluginType](name, plugin)
        resolve()
      }
    })
  })
}

/**
 * Transform string to uppercase first
 * 
 * @param {string} str 
 */
DostaqEngine.prototype._ucfirst = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
