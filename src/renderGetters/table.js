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
        .filter(({ type }) => type.includes('_open') && !type.startsWith('td'))
        .findIndex(({ type }) => type.startsWith('thead') || type.startsWith('tbody'))

      return { index: parentDistance }
    }
  },
  {
    tag: 'th',
    toProps: (tokens, index) => {
      const parentDistance = tokens
        .slice(0, index)
        .reverse()
        .filter(({ type }) => type.includes('_open'))
        .findIndex(({ type }) => type.startsWith('tr'))

      return { index: parentDistance }
    }
  },
  {
    tag: 'td',
    toProps: (tokens, index) => {
      const parentDistance = tokens
        .slice(0, index)
        .reverse()
        .filter(({ type }) => type.includes('_open'))
        .findIndex(({ type }) => type.startsWith('tr'))

      return { index: parentDistance }
    }
  },
]

function getTableDescendantProps (tokens, index) {
  const tag = tokens[index].tag,
        toProps = tableDescendantPropGetters.find(({ tag: t }) => t === tag).toProps,
        props = toProps(tokens, index)

  return props
}
