import { getPreviousToken, replaceTag } from '../util'

const state = {}

export function tableOpen (md) {
  return (tokens, index, options) => {
    const previousToken = getPreviousToken(tokens, index),
          isProse = previousToken ? previousToken.type === 'container_prose_open' : false,
          defaultTag = md.renderer.renderToken(tokens, index, options)

    state.isProse = isProse

    return isProse
      ? replaceTag(defaultTag, 'ProseGrid', true)
      : defaultTag
  }
}

export function tableDescendant (md, type, isOpen) {
  return (tokens, index, options) => {
    const isProse = state.isProse,
          defaultTag = md.renderer.renderToken(tokens, index, options)

    return isProse
      ? replaceTag(defaultTag, `Prose${type}`, isOpen)
      : defaultTag
  }
}
