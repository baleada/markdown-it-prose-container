import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import loopedIdPrefix from '@baleada/vue-prose/loopedIdPrefix'
import MarkdownIt from 'markdown-it'

import plugin from '../../lib/index.js'
import { proseAside, proseBlockquote, proseCodeblock, proseDetails, proseTable, proseHeading, proseList, proseSection, blockquote, codeblock, table, heading, list } from '../fixtures/markdown.js'

const suite = createSuite('plugin (node)')

const md = new MarkdownIt({ html: true })
md.use(plugin, { template: 'vue' }) // Vue is hardcoded here because other templates are not yet fully supported

suite('renders ProseAside', context => {
  const value = md.render(proseAside),
        expected = `\
<ProseAside v-bind="{'type':'info'}">\n\
<p>aside</p>\n\
</ProseAside>\n\
`

  assert.is(value, expected)
})

suite('renders ProseBlockquote', context => {
  const value = md.render(proseBlockquote),
        expected = `\
<ProseBlockquote v-bind="{}">\n\
<blockquote>\n\
<p>blockquote</p>\n\
</blockquote>\n\
</ProseBlockquote>\n\
`

  assert.is(value, expected)
})

suite('renders ProseCodeblock', context => {
  const value = md.render(proseCodeblock),
        expected = `\
<ProseCodeblock v-bind="{'lang':'js','lines':2}">\n\
<pre><code class="language-js">codeblock\n\
other line\n\
</code></pre>\n\
</ProseCodeblock>\n\
`

  assert.is(value, expected)
})

suite('renders ProseDetails', context => {
  const value = md.render(proseDetails),
        expected = `\
<ProseDetails v-bind="{'summary':'summary'}">\n\
<p>details</p>\n\
</ProseDetails>\n\
`

  assert.is(value, expected)
})

suite('renders ProseTable', context => {
  const value = md.render(proseTable),
  expected = `\
<ProseTable v-bind="{'totalBodyRows':2,'totalColumns':2}">\n\
<template #${loopedIdPrefix}-0-${loopedIdPrefix}-0-${loopedIdPrefix}-0="{ ref }"><div :ref="ref">Prose</div></template>\
<template #${loopedIdPrefix}-0-${loopedIdPrefix}-0-${loopedIdPrefix}-1="{ ref }"><div :ref="ref">Table</div></template>\
<template #${loopedIdPrefix}-1-${loopedIdPrefix}-0-${loopedIdPrefix}-0="{ ref }"><div :ref="ref">0, 0</div></template>\
<template #${loopedIdPrefix}-1-${loopedIdPrefix}-0-${loopedIdPrefix}-1="{ ref }"><div :ref="ref">0, 1</div></template>\
<template #${loopedIdPrefix}-1-${loopedIdPrefix}-1-${loopedIdPrefix}-0="{ ref }"><div :ref="ref">1, 0</div></template>\
<template #${loopedIdPrefix}-1-${loopedIdPrefix}-1-${loopedIdPrefix}-1="{ ref }"><div :ref="ref">1, 1</div></template>\
</ProseTable>\n\
`

  assert.is(value, expected)
})

suite('renders ProseHeading', context => {
  const value = md.render(proseHeading),
        expected = `\
<ProseHeading v-bind="{'level':1}">\n\
Heading</ProseHeading>\n\
`

  assert.is(value, expected)
})

suite('renders ProseList', context => {
  const value = md.render(proseList),
        expected = `\
<ProseList v-bind="{'tag':'ol','totalItems':2}">\n\
<template #${loopedIdPrefix}-0="{ ref }"><li :ref="ref">list item</li></template>\
<template #${loopedIdPrefix}-1="{ ref }"><li :ref="ref">also list item</li></template>\
</ProseList>\n\
`

  assert.is(value, expected)
})

suite('renders ProseSection', context => {
  const value = md.render(proseSection),
        expected = `\
<ProseSection v-bind="{}">\n\
<p>section</p>\n\
</ProseSection>\n\
`

  assert.is(value, expected)
})

suite('renders blockquote', context => {
  const value = md.render(blockquote),
        expected = `\
<blockquote>\n\
<p>blockquote</p>\n\
</blockquote>\n\
`

  assert.is(value, expected)
})

suite('renders codeblock', context => {
  const value = md.render(codeblock),
        expected = `\
<pre><code>codeblock\n\
</code></pre>\n\
`

  assert.is(value, expected)
})

suite('renders table', context => {
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

  assert.is(value, expected)
})

suite('renders heading', context => {
  const value = md.render(heading),
        expected = `\
<h1>Heading</h1>\n\
`

  assert.is(value, expected)
})

suite('renders list', context => {
  const value = md.render(list),
        expected = `\
<ul>\n\
<li>list item</li>\n\
</ul>\n\
`

  assert.is(value, expected)
})

suite.run()
