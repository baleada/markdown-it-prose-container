import test from 'ava'
import toBound from '../../src/markdown-it/util/toBound'

test.beforeEach(t => {
  t.context.props = {
    string: 'baleada\'s',
    number: 42,
  }
})

test('binds props for Vue templates', t => {
  const value = toBound(t.context.props, 'vue'),
        expected = "v-bind=\"{'string':'baleada\\'s','number':42}\""
  t.is(value, expected)
})

test('binds props for JSX templates', t => {
  const value = toBound(t.context.props, 'jsx'),
        expected = "{...{'string':'baleada\\'s','number':42}}"
  t.is(value, expected)
})

test('binds props for Svelte templates', t => {
  const value = toBound(t.context.props, 'svelte'),
        expected = "{...{'string':'baleada\\'s','number':42}}"
  t.is(value, expected)
})
