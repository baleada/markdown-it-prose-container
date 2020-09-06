import test from 'ava'
import infoToProps from '../src/util/infoToProps'

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
  t.context.infoToProps = info => infoToProps({ info, containerType: 'example' })
})

test('parses arrays', t => {
  const info = 'array=[one,two]',
        value = t.context.infoToProps(info),
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
          explicitlyTrue: t.context.infoToProps(explicitlyTrue),
          explicitlyFalse: t.context.infoToProps(explicitlyFalse),
          implicitlyTrue: t.context.infoToProps(implicitlyTrue),
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
        value = t.context.infoToProps(info),
        expected = { number: 42 }

  t.deepEqual(value, expected)
})

// test('parses objects', t => {
  
// })

test('parses single word strings with no quotes', t => {
  const info = 'string=baleada',
        value = t.context.infoToProps(info),
        expected = { string: 'baleada' }

  t.deepEqual(value, expected)
})
