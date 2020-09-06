import { lookupPreviousToken, removeTag } from '../util'

export function headingOpen (md, state) {
  return (tokens, index, options) => {
    const previousToken = lookupPreviousToken({ tokens, index }),
          isProse = previousToken ? previousToken.type === 'container_prose_open' : false,
          defaultTag = md.renderer.renderToken(tokens, index, options)

    state.isProse = isProse

    return isProse
      ? removeTag(defaultTag)
      : defaultTag
  }
}

export function headingClose (md, state) {
  return (tokens, index, options) => {
    const isProse = state.isProse,
          defaultTag = md.renderer.renderToken(tokens, index, options)

    if (isProse) {
      state.isProse = false
    }

    return isProse
      ? removeTag(defaultTag)
      : defaultTag
  }
}
