import test from 'ava'
import MarkdownIt from 'markdown-it'
import plugin from '../src'
import { proseAside, proseBlockquote, proseCodeblock, proseDetails, proseGrid, proseHeading, proseSection, blockquote, codeblock, grid, heading } from './fixtures/markdown'

const md = new MarkdownIt()
md.use(plugin, 'vue') // Vue is hardcoded here because all template formatting is tested in toBound.test.js

test('plugin(md, [invalid] throws error)', t => {
  const m = new MarkdownIt(),
        invalid = () => m.use(plugin, 'poopy')
  t.throws(invalid)
})

test('renders ProseAside', t => {
  const value = md.render(proseAside),
        expected = '<ProseAside v-bind="{\'type\':\'info\'}">\n<p>aside</p>\n</ProseAside>\n'

  t.is(value, expected)
})

test('renders ProseBlockquote', t => {
  const value = md.render(proseBlockquote),
        expected = '<ProseBlockquote v-bind="{}">\n<blockquote>\n<p>blockquote</p>\n</blockquote>\n</ProseBlockquote>\n'

  t.is(value, expected)
})

test('renders ProseCodeblock', t => {
  const value = md.render(proseCodeblock),
        expected = '<ProseCodeblock v-bind="{}">\n<pre><code>codeblock\n</code></pre>\n</ProseCodeblock>\n'

  t.is(value, expected)
})

test('renders ProseDetails', t => {
  const value = md.render(proseDetails),
        expected = '<ProseDetails v-bind="{\'summary\':\'summary\'}">\n<p>details</p>\n</ProseDetails>\n'

  t.is(value, expected)
})

// test('renders ProseGrid', t => {
//   const value = md.render(proseGrid),
//         expected = '<ProseAside type="info">\n<p>aside</p>\n</ProseAside>\n'
//
//   t.is(value, expected)
// })

test('renders ProseHeading', t => {
  const value = md.render(proseHeading),
        expected = '<ProseHeading v-bind="{\'level\':1}">\n<span>Heading</span>\n</ProseHeading>\n'

  t.is(value, expected)
})

test('renders ProseSection', t => {
  const value = md.render(proseSection),
        expected = '<ProseSection v-bind="{}">\n<p>section</p>\n</ProseSection>\n'

  t.is(value, expected)
})
