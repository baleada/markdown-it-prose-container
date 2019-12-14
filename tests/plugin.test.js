import test from 'ava'
import MarkdownIt from 'markdown-it'
import propsInterfaces from '@baleada/prose/vue/propsInterfaces'
import plugin from '../src'
import { proseAside, proseBlockquote, proseCodeblock, proseDetails, proseGrid, proseHeading, proseList, proseSection, blockquote, codeblock, grid, heading, list } from './fixtures/markdown'

const md = new MarkdownIt()
md.use(plugin, { templateType: 'vue', propsInterfaces }) // Vue is hardcoded here because all template formatting is tested in toBound.test.js

test('plugin(md, [invalid] throws error)', t => {
  const m = new MarkdownIt(),
        invalid = () => m.use(plugin, 'poopy')
  t.throws(invalid)
})

test('renders ProseAside', t => {
  const value = md.render(proseAside),
        expected = '\
<ProseAside v-bind="{\'type\':\'info\'}">\n\
<p>aside</p>\n\
</ProseAside>\n\
'

  t.is(value, expected)
})

test('renders ProseBlockquote', t => {
  const value = md.render(proseBlockquote),
        expected = '\
<ProseBlockquote v-bind="{}">\n\
<blockquote>\n\
<p>blockquote</p>\n\
</blockquote>\n\
</ProseBlockquote>\n\
'

  t.is(value, expected)
})

test('renders ProseCodeblock', t => {
  const value = md.render(proseCodeblock),
        expected = '\
<ProseCodeblock v-bind="{}">\n\
<pre><code>codeblock\n\
</code></pre>\n\
</ProseCodeblock>\n\
'

  t.is(value, expected)
})

test('renders ProseDetails', t => {
  const value = md.render(proseDetails),
        expected = '\
<ProseDetails v-bind="{\'summary\':\'summary\'}">\n\
<p>details</p>\n\
</ProseDetails>\n\
'

  t.is(value, expected)
})

test('renders ProseGrid', t => {
  const value = md.render(proseGrid),
        expected = '\
<ProseGrid v-bind="{\'rows\':[{\'rowgroup\':0,\'row\':0},{\'rowgroup\':1,\'row\':0},{\'rowgroup\':1,\'row\':1}],\'gridcells\':[{\'rowgroup\':0,\'row\':0,\'gridcell\':0},{\'rowgroup\':0,\'row\':0,\'gridcell\':1},{\'rowgroup\':1,\'row\':0,\'gridcell\':0},{\'rowgroup\':1,\'row\':0,\'gridcell\':1},{\'rowgroup\':1,\'row\':1,\'gridcell\':0},{\'rowgroup\':1,\'row\':1,\'gridcell\':1}]}">\n\
<ProseGridContents>\n\
<ProseRowgroup v-bind="{\'index\':0}">\n\
<ProseRow v-bind="{\'rowgroup\':0,\'index\':0}">\n\
<ProseColumnheader v-bind="{\'rowgroup\':0,\'row\':0,\'index\':0}">Prose</ProseColumnheader>\n\
<ProseColumnheader v-bind="{\'rowgroup\':0,\'row\':0,\'index\':1}">Grid</ProseColumnheader>\n\
</ProseRow>\n\
</ProseRowgroup>\n\
<ProseRowgroup v-bind="{\'index\':1}">\n\
<ProseRow v-bind="{\'rowgroup\':1,\'index\':0}">\n\
<ProseGridcell v-bind="{\'rowgroup\':1,\'row\':0,\'index\':0}">0, 0</ProseGridcell>\n\
<ProseGridcell v-bind="{\'rowgroup\':1,\'row\':0,\'index\':1}">0, 1</ProseGridcell>\n\
</ProseRow>\n\
<ProseRow v-bind="{\'rowgroup\':1,\'index\':1}">\n\
<ProseGridcell v-bind="{\'rowgroup\':1,\'row\':1,\'index\':0}">1, 0</ProseGridcell>\n\
<ProseGridcell v-bind="{\'rowgroup\':1,\'row\':1,\'index\':1}">1, 1</ProseGridcell>\n\
</ProseRow>\n\
</ProseRowgroup>\n\
</ProseGridContents>\n\
</ProseGrid>\n\
'

  t.is(value, expected)
})

test('renders ProseHeading', t => {
  const value = md.render(proseHeading),
        expected = '\
<ProseHeading v-bind="{\'level\':1}">\n\
Heading\n\
</ProseHeading>\n\
'

  t.is(value, expected)
})

test('renders ProseList', t => {
  const value = md.render(proseList),
        expected = '\
<ProseList v-bind="{\'listItems\':[{\'listItem\':0},{\'listItem\':1}]}">\n\
<ProseListContents v-bind="{\'isOrdered\':true}">\n\
<ProseListItem v-bind="{\'index\':0}">list item</ProseListItem>\n\
<ProseListItem v-bind="{\'index\':1}">also list item</ProseListItem>\n\
</ProseListContents>\n\
</ProseList>\n\
'

  t.is(value, expected)
})

test('renders ProseSection', t => {
  const value = md.render(proseSection),
        expected = '\
<ProseSection v-bind="{}">\n\
<p>section</p>\n\
</ProseSection>\n\
'

  t.is(value, expected)
})

test('renders blockquote', t => {
  const value = md.render(blockquote),
        expected = '\
<blockquote>\n\
<p>blockquote</p>\n\
</blockquote>\n\
'

  t.is(value, expected)
})

test('renders codeblock', t => {
  const value = md.render(codeblock),
        expected = '\
<pre><code>codeblock\n\
</code></pre>\n\
'

  t.is(value, expected)
})

test('renders grid', t => {
  const value = md.render(grid),
        expected = '\
<table>\n\
<thead>\n\
<tr>\n\
<th>Grid</th>\n\
</tr>\n\
</thead>\n\
<tbody>\n\
<tr>\n\
<td>grid</td>\n\
</tr>\n\
</tbody>\n\
</table>\n\
'

  t.is(value, expected)
})

test('renders heading', t => {
  const value = md.render(heading),
        expected = '\
<h1>Heading</h1>\n\
'

  t.is(value, expected)
})

test('renders list', t => {
  const value = md.render(list),
        expected = '\
<ul>\n\
<li>list item</li>\n\
</ul>\n\
'

  t.is(value, expected)
})
