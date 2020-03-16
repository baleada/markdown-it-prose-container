import { getPreviousToken, removeTag } from '../util'

const state = {}

export function headingOpen (md) {
  return (tokens, index, options) => {
    const previousToken = getPreviousToken(tokens, index),
          isProse = previousToken ? previousToken.type === 'container_prose_open' : false,
          defaultTag = md.renderer.renderToken(tokens, index, options)

    state.isProse = isProse

    return isProse
      ? removeTag(defaultTag)
      : defaultTag
  }
}

export function headingClose (md) {
  return (tokens, index, options) => {
    const isProse = state.isProse,
          defaultTag = md.renderer.renderToken(tokens, index, options)

    return isProse
      ? removeTag(defaultTag)
      : defaultTag
  }
}
