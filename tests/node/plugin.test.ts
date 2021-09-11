import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import MarkdownIt from 'markdown-it'
import { createMarkdownItProseContainer } from '../../src'
import { proseAside, proseBlockquote, proseCodeblock, proseDetails, proseTable, proseHeading, proseMedia, proseList, proseSection, blockquote, codeblock, table, heading, list } from '../fixtures/markdown'

const suite = createSuite('plugin (node)')

const md = new MarkdownIt({ html: true })
md.use(createMarkdownItProseContainer({ template: 'vue' })) // Vue is hardcoded here because other templates are not yet fully supported

suite('renders BaleadaProseAside', context => {
  const value = md.render(proseAside),
        expected = `\
<BaleadaProseAside v-bind="{'type':'info'}">\n\
<p>aside</p>\n\
</BaleadaProseAside>\n\
`

  assert.is(value, expected)
})

suite('renders BaleadaProseBlockquote', context => {
  const value = md.render(proseBlockquote),
        expected = `\
<BaleadaProseBlockquote v-bind="{}">\n\
<blockquote>\n\
<p>blockquote</p>\n\
</blockquote>\n\
</BaleadaProseBlockquote>\n\
`

  assert.is(value, expected)
})

suite('renders BaleadaProseCodeblock', context => {
  const value = md.render(proseCodeblock),
        expected = `\
<BaleadaProseCodeblock v-bind="{'lang':'js','lines':2}">\n\
<pre><code class="language-js">codeblock\n\
other line\n\
</code></pre>\n\
</BaleadaProseCodeblock>\n\
`

  assert.is(value, expected)
})

suite('renders BaleadaProseDetails', context => {
  const value = md.render(proseDetails),
        expected = `\
<BaleadaProseDetails v-bind="{'summary':'summary'}">\n\
<p>details</p>\n\
</BaleadaProseDetails>\n\
`

  assert.is(value, expected)
})

suite('renders BaleadaProseTable', context => {
  const value = md.render(proseTable),
  expected = `\
<BaleadaProseTable v-bind="{'totalBodyRows':2,'totalColumns':2}">\n\
<template #looped-0-looped-0-looped-0="{ ref }"><div :ref="ref">BaleadaProse</div></template>\
<template #looped-0-looped-0-looped-1="{ ref }"><div :ref="ref">Table</div></template>\
<template #looped-1-looped-0-looped-0="{ ref }"><div :ref="ref">0, 0</div></template>\
<template #looped-1-looped-0-looped-1="{ ref }"><div :ref="ref">0, 1</div></template>\
<template #looped-1-looped-1-looped-0="{ ref }"><div :ref="ref">1, 0</div></template>\
<template #looped-1-looped-1-looped-1="{ ref }"><div :ref="ref">1, 1</div></template>\
</BaleadaProseTable>\n\
`

  assert.is(value, expected)
})

suite('renders BaleadaProseHeading', context => {
  const value = md.render(proseHeading),
        expected = `\
<BaleadaProseHeading v-bind="{'level':1,'isFirst':true}">\n\
Heading</BaleadaProseHeading>\n\
`

  assert.is(value, expected)
})

suite('renders BaleadaProseMedia', context => {
  const value = md.render(proseMedia),
        expected = `\
<BaleadaProseMedia v-bind="{'ariaLabel':'Panama cortado','type':'image','src':'https://res.cloudinary.com/duib7ae0a/image/upload/q_auto,f_auto,w_1500/alex-vipond/panama-cortado.jpg','isFirst':true}">\n\
</BaleadaProseMedia>\n\
`

  assert.is(value, expected)
})

suite('renders BaleadaProseList', context => {
  const value = md.render(proseList),
        expected = `\
<BaleadaProseList v-bind="{'tag':'ol','totalItems':2}">\n\
<template #looped-0="{ ref }"><li :ref="ref">list item</li></template>\
<template #looped-1="{ ref }"><li :ref="ref">also list item</li></template>\
</BaleadaProseList>\n\
`

  assert.is(value, expected)
})

suite('renders BaleadaProseSection', context => {
  const value = md.render(proseSection),
        expected = `\
<BaleadaProseSection v-bind="{}">\n\
<p>section</p>\n\
</BaleadaProseSection>\n\
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
