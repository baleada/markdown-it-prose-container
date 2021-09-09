import type Token from 'markdown-it/lib/token'
import type { Cache } from '../createMarkdownItProseContainer'

const inferredByNextTokenType: Record<'fence' | 'heading_open' | 'table_open' | 'blockquote_open' | 'ordered_list_open' | 'bullet_list_open', Cache['container']['component']> = {
        fence: 'BaleadaProseCodeblock',
        heading_open: 'BaleadaProseHeading',
        table_open: 'BaleadaProseTable',
        blockquote_open: 'BaleadaProseBlockquote',
        ordered_list_open: 'BaleadaProseList',
        bullet_list_open: 'BaleadaProseList',
      }

export function toInferred (
  { info, nesting, nextTokenType, cache }: {
    info: Token['info'],
    nesting: Token['nesting'],
    nextTokenType: Token['type'],
    cache: Cache,
  }
): Cache['container']['component'] {
  const isOpen = nesting === 1

  if (!isOpen) {
    return cache.container.component
    // No need to reset cache after processing the close token,
    // because the next open token will set it appropriately
  }

  const inferred: Cache['container']['component'] = inferredByNextTokenType[nextTokenType] || fromInfo(info)
  cache.container.component = inferred

  return inferred
}

function fromInfo (info: string): Cache['container']['component'] {
  if (asideRE.test(info)) {
    return 'BaleadaProseAside'
  }

  if (mediaRE.test(info)) {
    return 'BaleadaProseMedia'
  }

  if (detailsRE.test(info)) {
    return 'BaleadaProseDetails'
  }

  return 'BaleadaProseSection'
}

const asideRE = /\s*?(?:type=(?:info|warning|danger|success|simple)|type="(?:info|warning|danger|success|simple)")/,
      mediaRE = /\s*?(?:type=(?:image|img|video|audio|embed|iframe)|type="(?:image|img|video|audio|embed|iframe)")/,
      detailsRE = /^\s*?summary=/
