import test from 'ava'
import MarkdownIt from 'markdown-it'
import MarkdownItContainer from 'markdown-it-container'
import plugin from '../src'
import { aside, blockquote, codeblock, details, grid, heading, section } from './fixtures/markdown'

const md = new MarkdownIt()
md.use(plugin, 'vue') // Vue is hardcoded here because all template formatting is tested in toBound.test.js

test('plugin(md, [invalid] throws error)', t => {
  const m = new MarkdownIt(),
        invalid = () => m.use(plugin, 'poopy')
  t.throws(invalid)
})

test('renders ProseAside', t => {
  const value = md.render(aside),
        expected = '<ProseAside v-bind="{\'type\':\'info\'}">\n<p>aside</p>\n</ProseAside>\n'

  t.is(value, expected)
})

test('renders ProseBlockquote', t => {
  const value = md.render(blockquote),
        expected = '<ProseBlockquote v-bind="{}">\n<blockquote><p>blockquote</p></blockquote>\n</ProseBlockquote>'

  t.is(value, expected)
})

test('renders ProseCodeblock', t => {
  const value = md.render(codeblock),
        expected = '<ProseCodeblock v-bind="{}">\n<pre><code>codeblock</code></pre>\n</ProseCodeblock>'

  t.is(value, expected)
})
//
// test('renders ProseDetails', t => {
//   const value = md.render(details),
//         expected = '<ProseDetails v-bind="{\'summary\':\'summary\'}">\n<p>details</p>\n</ProseDetails>'
//
//   t.is(value, expected)
// })

// test('renders ProseGrid', t => {
//   const value = md.render(grid),
//         expected = '<ProseAside type="info">\n<p>aside</p>\n</ProseAside>'
//
//   t.is(value, expected)
// })

// test('renders ProseHeading', t => {
//   const value = md.render(heading),
//         expected = '<ProseHeading :level="1">\n<h1>heading</h1>\n</ProseHeading>'
//
//   t.is(value, expected)
// })

// test('renders ProseSection', t => {
//   const value = md.render(section),
//         expected = '<ProseSection v-bind="{}">\n<p>section</p>\n</ProseSection>'
//
//   t.is(value, expected)
// })
