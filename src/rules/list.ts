import type MarkdownIt from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer'
import { Cache } from '../createMarkdownItProseContainer'
import { lookupPreviousToken } from '../extracted'

export function list (
  { md, cache, containerType }: {
    md: MarkdownIt,
    cache: Cache,
    containerType?: string
  }
): RenderRule {
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
          isInsideProseContainer = previousToken?.type === containerType

    cache.list.isInsideProseContainer = isInsideProseContainer

    return isInsideProseContainer
      ? ''
      : defaultTag
  }
}

export function listItem (
  { md, cache }: {
    md: MarkdownIt,
    cache: Cache,
  }
): RenderRule {
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
            .reverse()
            .findIndex(({ type }) => ['ordered_list_open', 'bullet_list_open'].includes(type)),
          listOpenIndex = tokens.slice(0, index).length - reverseListOpenIndex,
          itemIndex = tokens
            .slice(listOpenIndex, index)
            .filter(({ type }) => type === 'list_item_open')
            .length

    // TODO: this only works for Vue and also breaks possibility of compatibility with other markdown-it plugins
    return `<template #looped-${itemIndex}="{ ref }"><li :ref="ref">`
  }
}
