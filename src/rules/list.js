import loopedIdPrefix from '@baleada/vue-prose/loopedIdPrefix/index.esm'
import { lookupPreviousToken } from '../util'

export function list ({ md, cache, containerName }) {
  return (tokens, index, options) => {
    const defaultTag = md.renderer.renderToken(tokens, index, options),
          isOpen = tokens[index].type.endsWith('open')

    if (!isOpen) {
      // No need to reset cache after processing the close token,
      // because the next open token will set it appropriately
      return cache.list.isInsideProseContainer
        ? ''
        : defaultTag
    }

    const previousToken = lookupPreviousToken({ tokens, index }),
          isInsideProseContainer = previousToken?.type === `container_${containerName}_open`

    cache.list.isInsideProseContainer = isInsideProseContainer

    return isInsideProseContainer
      ? ''
      : defaultTag
  }
}

export function listItem ({ md, cache }) {
  return (tokens, index, options) => {
    const defaultTag = md.renderer.renderToken(tokens, index, options),
          isInsideProseContainer = cache.list.isInsideProseContainer,
          isOpen = tokens[index].type.endsWith('open')

    if (!isInsideProseContainer) {
      return defaultTag
    }

    if (!isOpen) {
      return `</li></template>`
    }

    const reverseListOpenIndex = tokens
            .slice(0, index)
            .reverse() // Mutates the sliced copy only
            .findIndex(({ type }) => ['ordered_list_open', 'bullet_list_open'].includes(type)),
          listOpenIndex = tokens.slice(0, index).length - reverseListOpenIndex,
          itemIndex = tokens
            .slice(listOpenIndex, index)
            .filter(({ type }) => type === 'list_item_open')
            .length

    // TODO: this only works for Vue and also breaks possibility of compatibility with other markdown-it plugins
    return `<template #${loopedIdPrefix}-${itemIndex}="{ ref }"><li :ref="ref">`
  }
}
