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

const utils = require('../../utils')

describe('Test DostaqEngine', () => {

  it('Should register a tag for liquidjs if file is exists', (cb) => {
    let dostaqEngine = utils.createEngine()
    dostaqEngine
      .registerTag('baseurl')
      .then(cb)
      .catch(cb)
  })

  it('Should register a filter for liquidjs if file is exists', (cb) => {
    let dostaqEngine = utils.createEngine()
    dostaqEngine
      .registerFilter('striptags')
      .then(cb)
      .catch(cb)
  })

  it('Should not register a filter for liquidjs if file doesn\'t exists', (cb) => {
    let dostaqEngine = utils.createEngine()
    dostaqEngine
      .registerFilter('nothing')
      .then(() => {
        cb(new Error('This must not called.'))
      })
      .catch(err => {
        cb()
      })
  })

  it('Should not register a tag for liquidjs if file doesn\'t exists', (cb) => {
    let dostaqEngine = utils.createEngine()
    dostaqEngine
      .registerTag('nothing')
      .then(() => {
        cb(new Error('This must not called.'))
      })
      .catch(err => {
        cb()
      })
  })
  
})
