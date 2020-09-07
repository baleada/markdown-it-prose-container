import test from 'ava'
import loopedIdPrefix from '@baleada/vue-prose/loopedIdPrefix'
import MarkdownIt from 'markdown-it'

import plugin from '../src'
import { proseAside, proseBlockquote, proseCodeblock, proseDetails, proseTable, proseHeading, proseList, proseSection, blockquote, codeblock, table, heading, list } from './fixtures/markdown'

const md = new MarkdownIt()
md.use(plugin, { template: 'vue' }) // Vue is hardcoded here because other templates are not yet fully supported

test('renders ProseAside', t => {
  const value = md.render(proseAside),
        expected = `\
<ProseAside v-bind="{'type':'info'}">\n\
<p>aside</p>\n\
</ProseAside>\n\
`

  t.is(value, expected)
})

test('renders ProseBlockquote', t => {
  const value = md.render(proseBlockquote),
        expected = `\
<ProseBlockquote v-bind="{}">\n\
<blockquote>\n\
<p>blockquote</p>\n\
</blockquote>\n\
</ProseBlockquote>\n\
`

  t.is(value, expected)
})

test('renders ProseCodeblock', t => {
  const value = md.render(proseCodeblock),
        expected = `\
<ProseCodeblock v-bind="{'lang':'js','lines':2}">\n\
<pre><code class="language-js">codeblock\n\
other line\n\
</code></pre>\n\
</ProseCodeblock>\n\
`

  t.is(value, expected)
})

test('renders ProseDetails', t => {
  const value = md.render(proseDetails),
        expected = `\
<ProseDetails v-bind="{'summary':'summary'}">\n\
<p>details</p>\n\
</ProseDetails>\n\
`

  t.is(value, expected)
})

test('renders ProseTable', t => {
  const value = md.render(proseTable),
  expected = `\
<ProseTable v-bind="{'totalBodyRows':2,'totalColumns':2}">\n\
<template #${loopedIdPrefix}-0-${loopedIdPrefix}-0-${loopedIdPrefix}-0><div>Prose</div></template>\
<template #${loopedIdPrefix}-0-${loopedIdPrefix}-0-${loopedIdPrefix}-1><div>Table</div></template>\
<template #${loopedIdPrefix}-1-${loopedIdPrefix}-0-${loopedIdPrefix}-0><div>0, 0</div></template>\
<template #${loopedIdPrefix}-1-${loopedIdPrefix}-0-${loopedIdPrefix}-1><div>0, 1</div></template>\
<template #${loopedIdPrefix}-1-${loopedIdPrefix}-1-${loopedIdPrefix}-0><div>1, 0</div></template>\
<template #${loopedIdPrefix}-1-${loopedIdPrefix}-1-${loopedIdPrefix}-1><div>1, 1</div></template>\
</ProseTable>\n\
`

  t.is(value, expected)
})

test('renders ProseHeading', t => {
  const value = md.render(proseHeading),
        expected = `\
<ProseHeading v-bind="{'level':1}">\n\
Heading</ProseHeading>\n\
`

  t.is(value, expected)
})

test('renders ProseList', t => {
  const value = md.render(proseList),
        expected = `\
<ProseList v-bind="{'tag':'ol','totalItems':2}">\n\
<template #${loopedIdPrefix}-0><li>list item</li>\n</template>\
<template #${loopedIdPrefix}-1><li>also list item</li>\n</template>\
</ProseList>\n\
`

  t.is(value, expected)
})

test('renders ProseSection', t => {
  const value = md.render(proseSection),
        expected = `\
<ProseSection v-bind="{}">\n\
<p>section</p>\n\
</ProseSection>\n\
`

  t.is(value, expected)
})

test('renders blockquote', t => {
  const value = md.render(blockquote),
        expected = `\
<blockquote>\n\
<p>blockquote</p>\n\
</blockquote>\n\
`

  t.is(value, expected)
})

test('renders codeblock', t => {
  const value = md.render(codeblock),
        expected = `\
<pre><code>codeblock\n\
</code></pre>\n\
`

  t.is(value, expected)
})

test('renders table', t => {
  const value = md.render(table),
        expected = `\
<table>\n\
<thead>\n\
<tr>\n\
<th>Table</th>\n\
</tr>\n\
</thead>\n\
<tbody>\n\
<tr>\n\
<td>table</td>\n\
</tr>\n\
</tbody>\n\
</table>\n\
`

  t.is(value, expected)
})

test('renders heading', t => {
  const value = md.render(heading),
        expected = `\
<h1>Heading</h1>\n\
`

  t.is(value, expected)
})

test('renders list', t => {
  const value = md.render(list),
        expected = `\
<ul>\n\
<li>list item</li>\n\
</ul>\n\
`

  t.is(value, expected)
})
