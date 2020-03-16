import { getPreviousToken, replaceTag, toBound } from '../util'

const state = {}

export function tableOpen (md) {
  return (tokens, index, options) => {
    const previousToken = getPreviousToken(tokens, index),
          isProse = previousToken ? previousToken.type === 'container_prose_open' : false,
          defaultTag = md.renderer.renderToken(tokens, index, options)

    state.isProse = isProse

    return isProse
      ? replaceTag(defaultTag, 'ProseGridContents', true)
      : defaultTag
  }
}

export function tableDescendant (md, type, isOpen, templateType) {
  return (tokens, index, options) => {
    const isProse = state.isProse,
          receivesProps = isOpen && isProse,
          props = receivesProps && getTableDescendantProps(tokens, index),
          newTag = receivesProps ? `Prose${type} ${toBound(props, templateType)}` : `Prose${type}`,
          defaultTag = md.renderer.renderToken(tokens, index, options)

    return isProse
      ? replaceTag(defaultTag, newTag, isOpen)
      : defaultTag
  }
}

const tableDescendantPropGetters = [
  {
    tag: 'thead',
    toProps: (tokens, index) => ({ index: 0 })
  },
  {
    tag: 'tbody',
    toProps: (tokens, index) => ({ index: 1 })
  },
  {
    tag: 'tr',
    toProps: (tokens, index) => {
      const parentDistance = tokens
        .slice(0, index)
        .reverse()
        .filter(({ type }) => ['thead_open', 'tbody_open', 'tr_open'].includes(type))
        .findIndex(({ type }) => type.startsWith('thead') || type.startsWith('tbody')),
            isHeader = tokens.slice(0, index).reverse()[0].type === 'thead_open'

      return { rowgroup: isHeader ? 0 : 1, index: parentDistance }
    }
  },
  {
    tag: 'th',
    toProps: (tokens, index) => {
      const parentDistance = tokens
        .slice(0, index)
        .reverse()
        .filter(({ type }) => ['th_open', 'tr_open'].includes(type))
        .findIndex(({ type }) => type.startsWith('tr'))

      return { rowgroup: 0, row: 0, index: parentDistance }
    }
  },
  {
    tag: 'td',
    toProps: (tokens, index) => {
      const tableOpenDistance = tokens
        .slice(0, index)
        .reverse()
        .findIndex(({ type }) => type === 'table_open'),
            table = tokens.slice(index - tableOpenDistance, index + 1),
            rows = table.filter(({ type }) => type === 'tr_open').length,
            parentDistance = table
              .reverse()
              .slice(1)
              .filter(({ type }) => ['td_open', 'tr_open'].includes(type))
              .findIndex(({ type }) => type.startsWith('tr'))

      return { rowgroup: 1, row: rows - 2, index: parentDistance }
    }
  },
]

function getTableDescendantProps (tokens, index) {
  const tag = tokens[index].tag,
        toProps = tableDescendantPropGetters.find(({ tag: t }) => t === tag).toProps,
        props = toProps(tokens, index)

  return props
}
