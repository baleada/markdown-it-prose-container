import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import { infoToProps } from '../../src/extracted'

const suite = createSuite('infoToProps (node)')

suite('parses arrays', context => {
  const info = 'tweetHashtags=[one,two]',
        value = infoToProps({ info, component: 'BaleadaProseBlockquote' }),
        expected = {
          tweetHashtags: ['one', 'two']
        }

  assert.equal(value, expected)
})

suite('parses booleans', context => {
  const explicitlyTrue = 'readerCanCopy=true',
        explicitlyFalse = 'readerCanCopy=false',
        explicitlyTrueWithQuotes = 'readerCanCopy="true"',
        explicitlyFalseWithQuotes = 'readerCanCopy="false"',
        implicitlyTrue = 'readerCanCopy',
        value = {
          explicitlyTrue: infoToProps({ info: explicitlyTrue, component: 'BaleadaProseHeading' }),
          explicitlyFalse: infoToProps({ info: explicitlyFalse, component: 'BaleadaProseHeading' }),
          explicitlyTrueWithQuotes: infoToProps({ info: explicitlyTrueWithQuotes, component: 'BaleadaProseHeading' }),
          explicitlyFalseWithQuotes: infoToProps({ info: explicitlyFalseWithQuotes, component: 'BaleadaProseHeading' }),          
          implicitlyTrue: infoToProps({ info: implicitlyTrue, component: 'BaleadaProseHeading' }),
        },
        expected = {
          explicitlyTrue: { readerCanCopy: true },
          explicitlyFalse: { readerCanCopy: false },
          explicitlyTrueWithQuotes: { readerCanCopy: true },
          explicitlyFalseWithQuotes: { readerCanCopy: false },
          implicitlyTrue: { readerCanCopy: true },
        }

  assert.equal(value, expected)
})

suite('parses numbers', context => {
  const info = 'totalLines=42',
        value = infoToProps({ info, component: 'BaleadaProseCodeblock' }),
        expected = { totalLines: 42 }

  assert.equal(value, expected)
})

suite('parses single word strings with no quotes', context => {
  const info = 'ariaLabel=baleada',
        value = infoToProps({ info, component: 'BaleadaProseTable' }),
        expected = { ariaLabel: 'baleada' }

  assert.equal(value, expected)
})

suite('parses single word strings with quotes', context => {
  const info = 'ariaLabel="baleada"',
        value = infoToProps({ info, component: 'BaleadaProseTable' }),
        expected = { ariaLabel: 'baleada' }

  assert.equal(value, expected)
})

suite('parses multi word strings with quotes', context => {
  const info = 'ariaLabel="Baleada: a toolkit for building web apps"',
        value = infoToProps({ info, component: 'BaleadaProseTable' }),
        expected = { ariaLabel: 'Baleada: a toolkit for building web apps' }

  assert.equal(value, expected)
})

suite.run()


