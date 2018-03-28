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

const utils = require('../../../utils')

describe('Test filter striptags', () => {
  let dostaqEngine = utils.createEngine()

  it('Should strip html tag', (cb) => {
    let dostaqEngine = utils.createEngine()
    dostaqEngine
      .registerFilter('striptags')
      .then(function() {
        return dostaqEngine._engine.renderFile('striptags', {
          myhtml: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quod atque quo soluta sapiente necessitatibus earum qui. Reiciendis, non quo veniam voluptatum rerum ducimus esse itaque accusantium dolorem, expedita fuga.</p>'
        })
      })
      .then(output => {
        expect(output.trim()).toBe('Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem quod atque quo soluta sapiente necessitatibus earum qui. Reiciendis, non quo veniam voluptatum rerum ducimus esse itaque accusantium dolorem, expedita fuga.')
        cb()
      })
      .catch(cb)
  })

})
