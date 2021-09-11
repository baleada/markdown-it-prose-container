import type Token from 'markdown-it/lib/token'
import type { Props } from '../state/propsInterfaces'
import { Cache } from '../createMarkdownItProseContainer'
import { infoToProps } from './infoToProps'

// tokens and index can be used to derive all the other parameters, but they're passed in here for convenience
export function containerTokenToProps (
  { tokens, index, info, component, nextToken, containerType }: {
    tokens: Token[],
    index: number,
    info: Token['info'],
    component: Cache['container']['component'],
    nextToken: Token,
    containerType: string,
  }
): Props {
  return (
    // Certain components derive props from other tokens and need special treatment.
    containerTokenToPropsByComponent?.[component]?.({ tokens, index, info, component, nextToken, containerType }) ||
    // All other components derive props from token info
    infoToProps({ info, component })
  )
}

const containerTokenToPropsByComponent: {
  [key in Cache['container']['component']]?: (
    { tokens, index, info, component, nextToken, containerType }: {
      tokens?: Token[],
      index?: number,
      info?: Token['info'],
      component?: Cache['container']['component'],
      nextToken?: Token,
      containerType?: string,
    }
  ) => Props
} = {
  BaleadaProseCodeblock: ({ tokens, index, info, component }) => ({
    ...infoToProps({ info, component }),
    lang: tokens[index + 1].info,
    lines: tokens[index + 1].content.replace(userEnteredNewlineRE, '').split('\n').length - 1
  }),
  BaleadaProseHeading: ({ tokens, index, info, component, nextToken }) => ({
    ...infoToProps({ info, component }),
    level: Number(nextToken?.tag.match(/\d$/)),
    isFirst: !tokens.slice(0, index).some(({ type }) => type === 'heading_open')
  }),
  BaleadaProseMedia: ({ tokens, index, info, component, containerType }) => ({
    ...infoToProps({ info, component }),
    isFirst: !tokens.slice(0, index).some(({ type, info }) => type === containerType && mediaREs.some(re => re.test(info)))
  }),
  BaleadaProseTable: ({ tokens, index, info, component }) => {
    const rootAndDescendantTokens = tokens.slice(
            index + 1, // table_open token
            index + tokens.slice(index + 1).findIndex(({ type }) => type === 'table_close') // This excludes the close token. Not a problem, because the close token isn't needed.
          ),
          totalBodyRows = rootAndDescendantTokens
            .filter(({ type }) => type === 'tr_open')
            .length - 1, // subtract the single tr_open in the table head
          totalColumns = rootAndDescendantTokens
            .filter(({ type }) => type === 'th_open')
            .length

    return {
      ...infoToProps({ info, component }),
      totalBodyRows,
      totalColumns,
    }
  },
  BaleadaProseList: ({ tokens, index, info, component }) => {
    const rootAndDescendantTokens = tokens.slice(
            index + 1, // ordered_list_open or bullet_list_open token
            index + tokens.slice(index).findIndex(token => ['ordered_list_close', 'bullet_list_close'].includes(token.type)) // This slice excludes the close token. Not a problem, because the close token isn't needed.
          ),
          { tag } = rootAndDescendantTokens[0],
          totalItems = tokens
            .filter(({ type }) => type === 'list_item_open')
            .length
            
    return {
      ...infoToProps({ info, component }),
      tag,
      totalItems,
    }
  },
}

// User-entered newlines in a codeblock should be removed
// before splitting the code by \n to count lines
const userEnteredNewlineRE = new RegExp('\\{2,}n', 'g')

const mediaREs = ['image', 'img', 'audio', 'video', 'embed', 'iframe']
  .map(medium => new RegExp(`(?:type=${medium}|type="${medium}"|type='${medium}')`))
