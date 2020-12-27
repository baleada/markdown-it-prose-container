import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import guessComponent from '../../src/util/guessComponent.js'

const suite = createSuite('guessComponent (node)')

const cacheStub = { container: {} }

suite('looks up certain open tokens by next token type', context => {
  const otherParamsStub = {
          info: '',
          nesting: 1,
          cache: { ...cacheStub },
        },
        values = [
          guessComponent({ nextTokenType: 'fence', ...otherParamsStub }),
          guessComponent({ nextTokenType: 'heading_open', ...otherParamsStub }),
          guessComponent({ nextTokenType: 'table_open', ...otherParamsStub }),
          guessComponent({ nextTokenType: 'blockquote_open', ...otherParamsStub }),
          guessComponent({ nextTokenType: 'ordered_list_open', ...otherParamsStub }),
          guessComponent({ nextTokenType: 'bullet_list_open', ...otherParamsStub }),
        ]
  
  assert.ok(values.every(value => !!value))
})

suite('recognizes ProseAside open token', context => {
  const otherParamsStub = {
          nesting: 1,
          nextTokenType: 'stub',
          cache: { ...cacheStub },
        },
        values = [
          guessComponent({ info: 'type="info"', ...otherParamsStub }),
          guessComponent({ info: 'type="warning"', ...otherParamsStub }),
          guessComponent({ info: 'type="danger"', ...otherParamsStub }),
          guessComponent({ info: 'type="success"', ...otherParamsStub }),
          guessComponent({ info: 'type="simple"', ...otherParamsStub }),
          guessComponent({ info: 'type=info', ...otherParamsStub }),
          guessComponent({ info: 'type=warning', ...otherParamsStub }),
          guessComponent({ info: 'type=danger', ...otherParamsStub }),
          guessComponent({ info: 'type=success', ...otherParamsStub }),
          guessComponent({ info: 'type=simple', ...otherParamsStub }),
          guessComponent({ info: '     type="info"', ...otherParamsStub }),
          guessComponent({ info: '     type="warning"', ...otherParamsStub }),
          guessComponent({ info: '     type="danger"', ...otherParamsStub }),
          guessComponent({ info: '     type="success"', ...otherParamsStub }),
          guessComponent({ info: '     type="simple"', ...otherParamsStub }),
        ]
  
  assert.ok(values.every(value => value === 'ProseAside'))
})

suite('recognizes ProseMedia open tokens', context => {
  const otherParamsStub = {
          nesting: 1,
          nextTokenType: 'stub',
          cache: { ...cacheStub },
        },
        values = [
          guessComponent({ info: 'type="image"', ...otherParamsStub }),
          guessComponent({ info: 'type="img"', ...otherParamsStub }),
          guessComponent({ info: 'type="video"', ...otherParamsStub }),
          guessComponent({ info: 'type="audio"', ...otherParamsStub }),
          guessComponent({ info: 'type="embed"', ...otherParamsStub }),
          guessComponent({ info: 'type="iframe"', ...otherParamsStub }),
          guessComponent({ info: 'type=image', ...otherParamsStub }),
          guessComponent({ info: 'type=img', ...otherParamsStub }),
          guessComponent({ info: 'type=video', ...otherParamsStub }),
          guessComponent({ info: 'type=audio', ...otherParamsStub }),
          guessComponent({ info: 'type=embed', ...otherParamsStub }),
          guessComponent({ info: 'type=iframe', ...otherParamsStub }),
          guessComponent({ info: '     type="image"', ...otherParamsStub }),
          guessComponent({ info: '     type="img"', ...otherParamsStub }),
          guessComponent({ info: '     type="video"', ...otherParamsStub }),
          guessComponent({ info: '     type="audio"', ...otherParamsStub }),
          guessComponent({ info: '     type="embed"', ...otherParamsStub }),
          guessComponent({ info: '     type="iframe"', ...otherParamsStub }),
        ]
  
  assert.ok(values.every(value => value === 'ProseMedia'))

})

suite('recognizes ProseDetails open tokens', context => {
  const otherParamsStub = {
          nesting: 1,
          nextTokenType: 'stub',
          cache: { ...cacheStub },
        },
        values = [
          guessComponent({ info: 'summary="Baleada: a toolkit for building web apps"', ...otherParamsStub }),
          guessComponent({ info: 'summary=Baleada', ...otherParamsStub }),
          guessComponent({ info: '     summary="Baleada: a toolkit for building web apps"', ...otherParamsStub }),
          guessComponent({ info: '     summary=Baleada', ...otherParamsStub }),
        ]
  
  assert.ok(values.every(value => value === 'ProseDetails'))
})

suite('falls back to ProseSection open token', context => {
  const otherParamsStub = {
          nesting: 1,
          nextTokenType: 'stub',
          cache: { ...cacheStub },
        },
        values = [
          guessComponent({ info: 'foo', ...otherParamsStub }),
          guessComponent({ info: 'bar', ...otherParamsStub }),
          guessComponent({ info: 'baz', ...otherParamsStub }),
        ]
  
  assert.ok(values.every(value => value === 'ProseSection'))
})

suite('looks up close token in cache', context => {
  const cache = { ...cacheStub }
  
  const openProseCodeblockStub = {
    nesting: 1,
    info: '',
    nextTokenType: 'fence',
    cache,
  }
  
  // Pass open token to establish cache
  guessComponent(openProseCodeblockStub)

  const value = guessComponent({ nesting: -1, info: undefined, nextTokenType: undefined, cache }),
        expected = 'ProseCodeblock'
        
  assert.is(value, expected)
})

suite.run()


