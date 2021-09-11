import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import { toBound } from '../../src/extracted'

const suite = createSuite('toBound (node)')

suite.before.each(context => {
  context.props = {
    string: 'baleada\'s',
    number: 42,
  }
})

suite('binds props for Vue templates', context => {
  const value = toBound({ props: context.props, template: 'vue' }),
        expected = "v-bind=\"{'string':'baleada\\'s','number':42}\""
  assert.is(value, expected)
})

// suite('binds props for JSX templates', context => {
//   const value = toBound({ props: context.props, template: 'jsx' }),
//         expected = "{...{'string':'baleada\\'s','number':42}}"
//   assert.is(value, expected)
// })

// suite('binds props for Svelte templates', context => {
//   const value = toBound({ props: context.props, template: 'svelte' }),
//         expected = "{...{'string':'baleada\\'s','number':42}}"
//   assert.is(value, expected)
// })

suite.run()
