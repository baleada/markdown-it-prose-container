import test from 'ava'
import MarkdownIt from 'markdown-it'
import plugin from '../src'
import { aside, blockquote, codeblock, details, grid, heading, section } from './fixtures/markdown'

const md = new MarkdownIt()
md.use(plugin)

test('title', t => {

})
test('renders ProseAside', t => {
  const value = md.render(aside),
        expected = '<ProseAside type="info">\n<p>aside</p>\n</ProseAside>'

  t.is(value, expected)
})

test('renders ProseBlockquote', t => {
  const value = md.render(blockquote),
        expected = '<ProseBlockquote>\n<blockquote><p>blockquote</p></blockquote>\n</ProseBlockquote>'

  t.is(value, expected)
})

test('renders ProseCodeblock', t => {
  const value = md.render(codeblock),
        expected = '<ProseAside type="info">\n<p>aside</p>\n</ProseAside>'

  t.is(value, expected)
})

test('renders ProseDetails', t => {
  const value = md.render(details),
        expected = '<ProseAside type="info">\n<p>aside</p>\n</ProseAside>'

  t.is(value, expected)
})

test('renders ProseGrid', t => {
  const value = md.render(grid),
        expected = '<ProseAside type="info">\n<p>aside</p>\n</ProseAside>'

  t.is(value, expected)
})

test('renders ProseHeading', t => {
  const value = md.render(heading),
        expected = '<ProseAside type="info">\n<p>aside</p>\n</ProseAside>'

  t.is(value, expected)
})

test('renders ProseSection', t => {
  const value = md.render(section),
        expected = '<ProseAside type="info">\n<p>aside</p>\n</ProseAside>'

  t.is(value, expected)
})
