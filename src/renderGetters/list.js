import { lookupPreviousToken } from '../util'

export function root ({ md, isOpen, state }) {
  return (tokens, index, options) => {
    const defaultTag = md.renderer.renderToken(tokens, index, options)

    if (!isOpen) {
      return state.list.isProse
        ? ''
        : defaultTag
    }

    const previousToken = lookupPreviousToken({ tokens, index }),
          isProse = previousToken?.type === 'container_prose_open'

    state.list.isProse = isProse

    return isProse
      ? ''
      : defaultTag
  }
}

export function item ({ md, type, isOpen, state }) {
  return (tokens, index, options) => {
    const isProse = state.list.isProse,
          isItem = type === ''
          defaultTag = md.renderer.renderToken(tokens, index, options)

    if (!isProse) {
      return defaultTag
    }

    return isOpen
      ? `<template #${loopedIdPrefix}-${itemIndex}>${defaultTag}`
      : `${defaultTag}</template>`
  }
}
