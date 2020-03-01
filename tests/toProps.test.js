import test from 'ava'
import toProps from '../src/util/toProps'

const propsInterfaces = [{
  name: 'example',
  interface: {
    array: 'array',
    boolean: 'boolean',
    number: 'number',
    string: 'string',
  }
}]

test.before(t => {
  t.context.toProps = info => toProps({ info, containerType: 'example', propsInterfaces })
})

test('parses arrays', t => {
  const info = 'array=[one,two]',
        value = t.context.toProps(info),
        expected = {
          array: ['one', 'two']
        }

  t.deepEqual(value, expected)
})

test('parses booleans', t => {
  const explicitlyTrue = 'boolean=true',
        explicitlyFalse = 'boolean=false',
        implicitlyTrue = 'boolean',
        value = {
          explicitlyTrue: t.context.toProps(explicitlyTrue),
          explicitlyFalse: t.context.toProps(explicitlyFalse),
          implicitlyTrue: t.context.toProps(implicitlyTrue),
        },
        expected = {
          explicitlyTrue: { boolean: true },
          explicitlyFalse: { boolean: false },
          implicitlyTrue: { boolean: true },
        }

  t.deepEqual(value, expected)
})

// test('parses dates', t => {
  
// })

// test('parses functions', t => {
  
// })

// test('parses maps', t => {
  
// })

test('parses numbers', t => {
  const info = 'number=42',
        value = t.context.toProps(info),
        expected = { number: 42 }

  t.deepEqual(value, expected)
})

// test('parses objects', t => {
  
// })

test('parses strings', t => {
  const info = 'string=baleada',
        value = t.context.toProps(info),
        expected = { string: 'baleada' }

  t.deepEqual(value, expected)
})
