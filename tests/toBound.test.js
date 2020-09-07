import test from 'ava'
import toBound from '../src/util/toBound'

test.beforeEach(t => {
  t.context.props = {
    string: 'baleada\'s',
    number: 42,
  }
})

test('binds props for Vue templates', t => {
  const value = toBound({ props: t.context.props, template: 'vue' }),
        expected = "v-bind=\"{'string':'baleada\\'s','number':42}\""
  t.is(value, expected)
})

test('binds props for JSX templates', t => {
  const value = toBound({ props: t.context.props, template: 'jsx' }),
        expected = "{...{'string':'baleada\\'s','number':42}}"
  t.is(value, expected)
})

test('binds props for Svelte templates', t => {
  const value = toBound({ props: t.context.props, template: 'svelte' }),
        expected = "{...{'string':'baleada\\'s','number':42}}"
  t.is(value, expected)
})
