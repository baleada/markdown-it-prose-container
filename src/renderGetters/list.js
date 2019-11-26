import { getPreviousToken, replaceTag, toBound } from '../util'

const state = {}

export function listOpen (md, isOrdered, templateType) {
  return (tokens, index, options) => {
    const previousToken = getPreviousToken(tokens, index),
          isProse = previousToken ? previousToken.type === 'container_prose_open' : false,
          receivesProps = isProse,
          props = receivesProps && { isOrdered },
          newTag = receivesProps ? `ProseListContents ${toBound(props, templateType)}` : `ProseListContents`,
          defaultTag = md.renderer.renderToken(tokens, index, options)

    state.isProse = isProse

    return isProse
      ? replaceTag(defaultTag, newTag, true)
      : defaultTag
  }
}

export function listDescendant (md, type, isOpen, templateType) {
  return (tokens, index, options) => {
    const isProse = state.isProse,
          receivesProps = isOpen && isProse,
          props = receivesProps && getListDescendantProps(tokens, index),
          newTag = receivesProps ? `Prose${type} ${toBound(props, templateType)}` : `Prose${type}`,
          defaultTag = md.renderer.renderToken(tokens, index, options)

    return isProse
      ? replaceTag(defaultTag, newTag, isOpen)
      : defaultTag
  }
}

const listDescendantPropGetters = [
  {
    tag: 'li',
    toProps: (tokens, index) => {
      const parentDistance = tokens
        .slice(0, index)
        .reverse()
        .filter(({ type }) => ['list_item_open', 'ordered_list_open', 'bullet_list_open'].some(t => type.includes(t)))
        .findIndex(({ type }) => type.startsWith('ordered_list') || type.startsWith('bullet_list'))

      return { index: parentDistance }
    }
  },
]

function getListDescendantProps (tokens, index) {
  const tag = tokens[index].tag,
        toProps = listDescendantPropGetters.find(({ tag: t }) => t === tag).toProps,
        props = toProps(tokens, index)

  return props
}
