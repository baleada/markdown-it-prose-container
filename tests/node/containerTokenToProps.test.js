import { suite as createSuite } from 'uvu'
import * as assert from 'uvu/assert'
import containerTokenToProps from '../../src/util/containerTokenToProps.js'

const suite = createSuite('containerTokenToProps (node)')

const proseContainerTokenStub = {},
      containerType = 'container_prose_open'

suite(`transforms token to ProseCodeblock's required props`, context => {
  const tokens = [
          proseContainerTokenStub,
          {
            info: 'js',
            content: 'console.log(\n`Baleada`\n)\n'
          }
        ],
        value = containerTokenToProps({
          containerType,
          tokens,
          index: 0,
          info: '',
          component: 'ProseCodeblock',
          nextToken: undefined // Not accessed in this case
        }),
        expected = {
          lang: 'js',
          lines: 3
        }

  assert.equal(value, expected)
})

suite(`transforms token to ProseHeading's required props`, context => {
  const tokens = [
          proseContainerTokenStub,
          {
            tag: 'h1',
          }
        ],
        value = containerTokenToProps({
          containerType,
          tokens,
          index: 0,
          info: '',
          component: 'ProseHeading',
          nextToken: tokens[1]
        }),
        expected = {
          level: 1,
          isFirst: true,
        }
  
  assert.equal(value, expected)
  
  const isNotFirst = containerTokenToProps({
          containerType,
          tokens: [{ type: 'heading_open' }, ...tokens],
          index: 1,
          info: '',
          component: 'ProseHeading',
          nextToken: tokens[1]
        }),
        isNotFirstExpected = {
          level: 1,
          isFirst: false,
        }
  
  assert.equal(isNotFirst, isNotFirstExpected)
})

suite(`transforms token to ProseMedia's required props`, context => {
  const tokens = [
          proseContainerTokenStub,
          {
            type: containerType,
          }
        ],
        value = containerTokenToProps({
          containerType,
          tokens,
          index: 0,
          info: '',
          component: 'ProseMedia',
          nextToken: tokens[1]
        }),
        expected = {
          isFirst: true,
        }

  assert.equal(value, expected)

  const isNotFirst = containerTokenToProps({
          containerType,
          tokens: [{ type: containerType, info: 'type="img"' }, ...tokens], // All possible ProseMedia types are checked, matching for single and double quotes around the value.
          index: 1,
          info: '',
          component: 'ProseMedia',
          nextToken: tokens[1]
        }),
        isNotFirstExpected = {
          isFirst: false,
        }

  assert.equal(isNotFirst, isNotFirstExpected)
})

suite(`transforms token to ProseTable's required props`, context => {
  const tokens = [
          proseContainerTokenStub,
          // Tokens stub generated on https://markdown-it.github.io/
          { type: 'table_open', },
          { type: 'thead_open', },
          { type: 'tr_open', },
          { type: 'th_open', },
          { type: 'inline', },
          { type: 'th_close', },
          { type: 'th_open', },
          { type: 'inline', },
          { type: 'th_close', },
          { type: 'tr_close', },
          { type: 'thead_close', },
          { type: 'tbody_open', },
          { type: 'tr_open', },
          { type: 'td_open', },
          { type: 'inline', },
          { type: 'td_close', },
          { type: 'td_open', },
          { type: 'inline', },
          { type: 'td_close', },
          { type: 'tr_close', },
          { type: 'tr_open', },
          { type: 'td_open', },
          { type: 'inline', },
          { type: 'td_close', },
          { type: 'td_open', },
          { type: 'inline', },
          { type: 'td_close', },
          { type: 'tr_close', },
          { type: 'tr_open', },
          { type: 'td_open', },
          { type: 'inline', },
          { type: 'td_close', },
          { type: 'td_open', },
          { type: 'inline', },
          { type: 'td_close', },
          { type: 'tr_close', },
          { type: 'tbody_close', },
          { type: 'table_close', }
        ],
        value = containerTokenToProps({
          containerType,
          tokens,
          index: 0,
          info: '',
          component: 'ProseTable',
          nextToken: undefined // Not accessed in this case
        }),
        expected= {
          totalBodyRows: 3,
          totalColumns: 2,
        }
  
  assert.equal(value, expected)
})

suite(`transforms token to ProseList's required props`, context => {
  const tokens = [
          proseContainerTokenStub,
          // Tokens stub generated on https://markdown-it.github.io/
          { type: 'bullet_list_open', tag: 'ul' },
          { type: 'list_item_open' },
          { type: 'paragraph_open' },
          { type: 'inline' },
          { type: 'paragraph_close', },
          { type: 'list_item_close' },
          { type: 'list_item_open' },
          { type: 'paragraph_open' },
          { type: 'inline' },
          { type: 'paragraph_close', },
          { type: 'list_item_close' },
          { type: 'bullet_list_close' },
        ],
        value = containerTokenToProps({
          containerType,
          tokens,
          index: 0,
          info: '',
          component: 'ProseList',
          nextToken: undefined // Not accessed in this case
        }),
        expected= {
          tag: 'ul',
          totalItems: 2,
        }
  
  assert.equal(value, expected)
})

// Non-required props are handled by infoToProps, which is tested separately

suite.run()
