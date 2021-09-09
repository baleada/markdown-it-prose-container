import type MarkdownIt from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer'
import { Cache } from '../createMarkdownItProseContainer'
import { lookupPreviousToken } from '../extracted'

export function table (
  { md, cache, containerName }: {
    md: MarkdownIt,
    cache: Cache,
    containerName: string,
  }
): RenderRule {
  return (tokens, index, options) => {
    const defaultTag = md.renderer.renderToken(tokens, index, options),
          isOpen = tokens[index].type.endsWith('open')

    if (!isOpen) {
      // No need to reset cache after processing the close token,
      // because the next open token will set it appropriately
      return cache.table.isInsideProseContainer
        ? ''
        : defaultTag
    }

    const previousToken = lookupPreviousToken({ tokens, index }),
          isInsideProseContainer = previousToken?.type === `container_${containerName}_open`

    cache.table.isInsideProseContainer = isInsideProseContainer

    return isInsideProseContainer
      ? ''
      : defaultTag
  }
}

export function tableDescendant (
  { md, cache }: {
    md: MarkdownIt,
    cache: Cache,
  }
): RenderRule {
  return (tokens, index, options) => {
    const defaultTag = md.renderer.renderToken(tokens, index, options),
          isInsideProseContainer = cache.table.isInsideProseContainer,
          isOpen = tokens[index].type.endsWith('open')

    if (!isInsideProseContainer) {
      return defaultTag
    }

    const type = tokens[index].type.replace(/_(open|close)$/, '')

    switch (type) {
      case 'thead':
      case 'tbody':
      case 'tr':
        return ''
      case 'th':
        // IIFE for easier variable name reuse
        return (() => {
          if (!isOpen) {
            return `</div></template>`
          }          
      
          const reverseRowOpenIndex = tokens
                  .slice(0, index)
                  .reverse() // Mutates the sliced copy only
                  .findIndex(({ type }) => type === 'tr_open'),
                rowOpenIndex = tokens.slice(0, index).length - reverseRowOpenIndex,
                columnHeaderIndexInRow = tokens
                  .slice(rowOpenIndex, index)
                  .filter(({ type }) => type === 'th_open')
                  .length
      
          // TODO: this only works for Vue and also breaks possibility of compatibility with other markdown-it plugins
          return `<template #looped-0-looped-0-looped-${columnHeaderIndexInRow}="{ ref }"><div :ref="ref">`
        })()
      case 'td':
        // IIFE for easier variable name reuse
        return (() => {
          if (!isOpen) {
            return `</div></template>`
          }
      
          const reverseBodyOpenIndex = tokens
                  .slice(0, index)
                  .reverse() // Mutates the sliced copy only
                  .findIndex(({ type }) => type === 'tbody_open'),
                bodyOpenIndex = tokens.slice(0, index).length - reverseBodyOpenIndex,
                reverseRowOpenIndex = tokens
                  .slice(0, index)
                  .reverse() // Mutates the sliced copy only
                  .findIndex(({ type }) => type === 'tr_open'),
                rowOpenIndex = tokens.slice(0, index).length - reverseRowOpenIndex,
                rowIndexInBody = tokens
                  .slice(bodyOpenIndex, rowOpenIndex)
                  .filter(({ type }) => type === 'tr_open')
                  .length - 1, // Don't ask
                cellIndexInRow = tokens
                  .slice(rowOpenIndex, index)
                  .filter(({ type }) => type === 'td_open')
                  .length
      
          // TODO: this only works for Vue and also breaks possibility of compatibility with other markdown-it plugins
          return `<template #looped-1-looped-${rowIndexInBody}-looped-${cellIndexInRow}="{ ref }"><div :ref="ref">`
        })()
    }
  }
}

