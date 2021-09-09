import type MarkdownIt from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer'
import type { Cache } from '../createMarkdownItProseContainer'
import { lookupPreviousToken } from '../extracted'

export function heading (
  { md, cache, containerType }: {
    md: MarkdownIt,
    cache: Cache,
    containerType: string,
  }
): RenderRule {
  return (tokens, index, options) => {
    const defaultTag = md.renderer.renderToken(tokens, index, options),
          isOpen = tokens[index].type.endsWith('open')
    
    if (!isOpen) {
      // No need to reset cache after processing the close token,
      // because the next open token will set it appropriately
      return cache.heading.isInsideProseContainer
        ? ''
        : defaultTag
    }
    
    const previousToken = lookupPreviousToken({ tokens, index }),
          isInsideProseContainer = previousToken?.type === containerType

    cache.heading.isInsideProseContainer = isInsideProseContainer

    return isInsideProseContainer
      ? ''
      : defaultTag
  }
}
