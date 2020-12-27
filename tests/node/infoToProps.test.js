import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import infoToProps from '../../src/util/infoToProps.js'

const suite = createSuite('infoToProps (node)')

const propsInterfaces = [{
  name: 'example',
  interface: {
    array: 'array',
    boolean: 'boolean',
    number: 'number',
    string: 'string',
  }
}]

suite.before(context => {
  context.infoToProps = info => infoToProps({ info, component: 'example', propsInterfaces })
})

suite('parses arrays', context => {
  const info = 'array=[one,two]',
        value = context.infoToProps(info),
        expected = {
          array: ['one', 'two']
        }

  assert.equal(value, expected)
})

suite('parses booleans', context => {
  const explicitlyTrue = 'boolean=true',
        explicitlyFalse = 'boolean=false',
        explicitlyTrueWithQuotes = 'boolean="true"',
        explicitlyFalseWithQuotes = 'boolean="false"',
        implicitlyTrue = 'boolean',
        value = {
          explicitlyTrue: context.infoToProps(explicitlyTrue),
          explicitlyFalse: context.infoToProps(explicitlyFalse),
          explicitlyTrueWithQuotes: context.infoToProps(explicitlyTrueWithQuotes),
          explicitlyFalseWithQuotes: context.infoToProps(explicitlyFalseWithQuotes),          
          implicitlyTrue: context.infoToProps(implicitlyTrue),
        },
        expected = {
          explicitlyTrue: { boolean: true },
          explicitlyFalse: { boolean: false },
          explicitlyTrueWithQuotes: { boolean: true },
          explicitlyFalseWithQuotes: { boolean: false },
          implicitlyTrue: { boolean: true },
        }

  assert.equal(value, expected)
})

suite('parses numbers', context => {
  const info = 'number=42',
        value = context.infoToProps(info),
        expected = { number: 42 }

  assert.equal(value, expected)
})

suite('parses single word strings with no quotes', context => {
  const info = 'string=baleada',
        value = context.infoToProps(info),
        expected = { string: 'baleada' }

  assert.equal(value, expected)
})

suite('parses single word strings with quotes', context => {
  const info = 'string="baleada"',
        value = context.infoToProps(info),
        expected = { string: 'baleada' }

  assert.equal(value, expected)
})

suite('parses multi word strings with quotes', context => {
  const info = 'string="Baleada: a toolkit for building web apps"',
        value = context.infoToProps(info),
        expected = { string: 'Baleada: a toolkit for building web apps' }

  assert.equal(value, expected)
})

suite.run()


