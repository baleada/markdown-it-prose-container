import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import toInferred from '../../src/util/toInferred.js'

const suite = createSuite('toInferred (node)')

const cacheStub = { container: {} }

suite('looks up certain open tokens by next token type', context => {
  const otherParamsStub = {
          info: '',
          nesting: 1,
          cache: { ...cacheStub },
        },
        values = [
          toInferred({ nextTokenType: 'fence', ...otherParamsStub }),
          toInferred({ nextTokenType: 'heading_open', ...otherParamsStub }),
          toInferred({ nextTokenType: 'table_open', ...otherParamsStub }),
          toInferred({ nextTokenType: 'blockquote_open', ...otherParamsStub }),
          toInferred({ nextTokenType: 'ordered_list_open', ...otherParamsStub }),
          toInferred({ nextTokenType: 'bullet_list_open', ...otherParamsStub }),
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
          toInferred({ info: 'type="info"', ...otherParamsStub }),
          toInferred({ info: 'type="warning"', ...otherParamsStub }),
          toInferred({ info: 'type="danger"', ...otherParamsStub }),
          toInferred({ info: 'type="success"', ...otherParamsStub }),
          toInferred({ info: 'type="simple"', ...otherParamsStub }),
          toInferred({ info: 'type=info', ...otherParamsStub }),
          toInferred({ info: 'type=warning', ...otherParamsStub }),
          toInferred({ info: 'type=danger', ...otherParamsStub }),
          toInferred({ info: 'type=success', ...otherParamsStub }),
          toInferred({ info: 'type=simple', ...otherParamsStub }),
          toInferred({ info: '     type="info"', ...otherParamsStub }),
          toInferred({ info: '     type="warning"', ...otherParamsStub }),
          toInferred({ info: '     type="danger"', ...otherParamsStub }),
          toInferred({ info: '     type="success"', ...otherParamsStub }),
          toInferred({ info: '     type="simple"', ...otherParamsStub }),
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
          toInferred({ info: 'type="image"', ...otherParamsStub }),
          toInferred({ info: 'type="img"', ...otherParamsStub }),
          toInferred({ info: 'type="video"', ...otherParamsStub }),
          toInferred({ info: 'type="audio"', ...otherParamsStub }),
          toInferred({ info: 'type="embed"', ...otherParamsStub }),
          toInferred({ info: 'type="iframe"', ...otherParamsStub }),
          toInferred({ info: 'type=image', ...otherParamsStub }),
          toInferred({ info: 'type=img', ...otherParamsStub }),
          toInferred({ info: 'type=video', ...otherParamsStub }),
          toInferred({ info: 'type=audio', ...otherParamsStub }),
          toInferred({ info: 'type=embed', ...otherParamsStub }),
          toInferred({ info: 'type=iframe', ...otherParamsStub }),
          toInferred({ info: '     type="image"', ...otherParamsStub }),
          toInferred({ info: '     type="img"', ...otherParamsStub }),
          toInferred({ info: '     type="video"', ...otherParamsStub }),
          toInferred({ info: '     type="audio"', ...otherParamsStub }),
          toInferred({ info: '     type="embed"', ...otherParamsStub }),
          toInferred({ info: '     type="iframe"', ...otherParamsStub }),
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
          toInferred({ info: 'summary="Baleada: a toolkit for building web apps"', ...otherParamsStub }),
          toInferred({ info: 'summary=Baleada', ...otherParamsStub }),
          toInferred({ info: '     summary="Baleada: a toolkit for building web apps"', ...otherParamsStub }),
          toInferred({ info: '     summary=Baleada', ...otherParamsStub }),
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
          toInferred({ info: 'foo', ...otherParamsStub }),
          toInferred({ info: 'bar', ...otherParamsStub }),
          toInferred({ info: 'baz', ...otherParamsStub }),
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
  toInferred(openProseCodeblockStub)

  const value = toInferred({ nesting: -1, info: undefined, nextTokenType: undefined, cache }),
        expected = 'ProseCodeblock'
        
  assert.is(value, expected)
})

suite.run()


