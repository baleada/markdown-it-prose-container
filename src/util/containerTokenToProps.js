import { clipable } from '@baleada/logic'
import infoToProps from './infoToProps'

// tokens and index can be used to derive all the other parameters, but they're passed in here for convenience
export default function containerTokenToProps ({ tokens, index, info, component, nextToken }) {
  return (
    // Certain components derive props from other tokens and need special treatment.
    containerTokenToPropsByComponent?.[component]({ tokens, index, info, component, nextToken }) ||
    // All other components derive props from token info
    infoToProps({ info, component })
  )
}

const containerTokenToPropsByComponent = {
  ProseCodeblock: ({ tokens, index, info, component }) => ({
    ...infoToProps({ info, component }),
    lang: tokens[index + 1].info,
    lines: clipable(tokens[index + 1].content).clip(userEnteredNewlineRE).split('\n').length
  }),
  ProseHeading: ({ info, component, nextToken }) => ({
    ...infoToProps({ info, component }),
    level: Number(nextToken?.tag.match(/\d$/))
  }),
  ProseTable: ({ tokens, index, info, component }) => {
    const rootAndDescendantTokens = tokens.slice(
            index + 1, // table_open token
            tokens.findIndex(({ type }) => type === 'table_close') + 1 // include the close token just to make this easier to reason about
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
  ProseList: ({ tokens, index, info, component }) => {
    const rootAndDescendantTokens = tokens.slice(
            index + 1, // ordered_list_open or bullet_list_open token
            tokens.findIndex(({ type }) => type === 'ordered_list_close' || type === 'bullet_list_close') + 1 // include the close token just to make this easier to reason about
          ),
          tag = (rootAndDescendantTokens[0].type === 'ordered_list_open' && 'ol') ||
                (rootAndDescendantTokens[0].type === 'bullet_list_open' && 'ul'),
          totalItems = tokens
            .slice(1, rootAndDescendantTokens.length - 1) // without opening and closing ol/ul tag
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