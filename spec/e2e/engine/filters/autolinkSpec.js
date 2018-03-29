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

describe('Test filter autolink', () => {
  let dostaqEngine = utils.createEngine()

  it('Should transform url and email into anchor tag', (cb) => {
    let dostaqEngine = utils.createEngine()
    dostaqEngine
      .registerFilter('autolink')
      .then(() => {
        return dostaqEngine._engine.renderFile('autolink', {
          myhtml: 'This is a link google.com. and mail support@unquez.com will be translated as we want'
        })
      })
      .then(output => {
        expect(output.trim()).toBe('This is a link <a href="http://google.com" target="_blank" rel="noopener noreferrer">google.com</a>. and mail <a href="mailto:support@unquez.com" target="_blank" rel="noopener noreferrer">support@unquez.com</a> will be translated as we want')
        cb()
      })
      .catch(cb)
  })

  it('Should transform url and email into anchor tag with class my-link', (cb) => {
    let dostaqEngine = utils.createEngine({
      autolink: {
        className: 'my-link'
      }
    })

    dostaqEngine
      .registerFilter('autolink')
      .then(() => {
        return dostaqEngine._engine.renderFile('autolink', {
          myhtml: 'This is a link google.com. and mail support@unquez.com will be translated as we want'
        })
      })
      .then(output => {
        expect(output.trim()).toBe('This is a link <a href="http://google.com" class="my-link my-link-url" target="_blank" rel="noopener noreferrer">google.com</a>. and mail <a href="mailto:support@unquez.com" class="my-link my-link-email" target="_blank" rel="noopener noreferrer">support@unquez.com</a> will be translated as we want')
        cb()
      })
      .catch(cb)
  })

})
