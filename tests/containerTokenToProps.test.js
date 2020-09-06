import test from 'ava'
import containerTokenToProps from '../src/util/containerTokenToProps'

const proseContainerTokenStub = {}

test(`transforms token to ProseCodeblock's required props`, t => {
  const tokens = [
          proseContainerTokenStub,
          {
            info: 'js',
            content: 'console.log(\n`Baleada`\n)'
          }
        ],
        value = containerTokenToProps({
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

  t.deepEqual(value, expected)
})

test(`transforms token to ProseHeading's required props`, t => {
  const tokens = [
    proseContainerTokenStub,
    {
      tag: 'h1',
    }
  ],
  value = containerTokenToProps({
    tokens,
    index: 0,
    info: '',
    component: 'ProseHeading',
    nextToken: tokens[1]
  }),
  expected = {
    level: 1,
  }

t.deepEqual(value, expected)
})

test(`transforms token to ProseTable's required props`, t => {
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
  
  t.deepEqual(value, expected)
})

test(`transforms token to ProseList's required props`, t => {
  const tokens = [
          proseContainerTokenStub,
          // Tokens stub generated on https://markdown-it.github.io/
          { type: 'bullet_list_open' },
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
  
  t.deepEqual(value, expected)
})

// Non-required props are handled by infoToProps, which is tested separately
