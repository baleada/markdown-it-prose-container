import test from 'ava'
import guessComponent from '../src/util/guessComponent'

const cacheStub = { container: {} }

test('looks up certain open tokens by next token type', t => {
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
  
  t.assert(values.every(value => !!value))
})

test('recognizes ProseAside open token', t => {
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
  
  t.assert(values.every(value => value === 'ProseAside'))
})

test('recognizes ProseMedia open tokens', t => {
  const otherParamsStub = {
          nesting: 1,
          nextTokenType: 'stub',
          cache: { ...cacheStub },
        },
        values = [
          guessComponent({ info: 'type="image"', ...otherParamsStub }),
          guessComponent({ info: 'type="video"', ...otherParamsStub }),
          guessComponent({ info: 'type="audio"', ...otherParamsStub }),
          guessComponent({ info: 'type=image', ...otherParamsStub }),
          guessComponent({ info: 'type=video', ...otherParamsStub }),
          guessComponent({ info: 'type=audio', ...otherParamsStub }),
          guessComponent({ info: '     type="image"', ...otherParamsStub }),
          guessComponent({ info: '     type="video"', ...otherParamsStub }),
          guessComponent({ info: '     type="audio"', ...otherParamsStub }),
        ]
  
  t.assert(values.every(value => value === 'ProseMedia'))

})

test('recognizes ProseDetails open tokens', t => {
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
  
  t.assert(values.every(value => value === 'ProseDetails'))
})

test('falls back to ProseSection open token', t => {
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
  
  t.assert(values.every(value => value === 'ProseSection'))
})

test('looks up close token in cache', t => {
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
        
  t.is(value, expected)
})
