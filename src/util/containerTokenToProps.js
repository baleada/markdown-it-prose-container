import propsInterfaces from '@baleada/vue-prose/propsInterfaces'
import infoToProps from './infoToProps.js'

// tokens and index can be used to derive all the other parameters, but they're passed in here for convenience
export default function containerTokenToProps ({ tokens, index, info, component, nextToken, containerType }) {
  return (
    // Certain components derive props from other tokens and need special treatment.
    containerTokenToPropsByComponent?.[component]?.({ tokens, index, info, component, nextToken, containerType }) ||
    // All other components derive props from token info
    infoToProps({ info, component, propsInterfaces })
  )
}

const containerTokenToPropsByComponent = {
  ProseCodeblock: ({ tokens, index, info, component }) => ({
    ...infoToProps({ info, component, propsInterfaces }),
    lang: tokens[index + 1].info,
    lines: tokens[index + 1].content.replace(userEnteredNewlineRE, '').split('\n').length - 1
  }),
  ProseHeading: ({ tokens, index, info, component, nextToken }) => ({
    ...infoToProps({ info, component, propsInterfaces }),
    level: Number(nextToken?.tag.match(/\d$/)),
    isFirst: !tokens.slice(0, index).some(({ type }) => type === 'heading_open')
  }),
  ProseMedia: ({ tokens, index, info, component, containerType }) => ({
    ...infoToProps({ info, component, propsInterfaces }),
    isFirst: !tokens.slice(0, index).some(({ type, info }) => type === containerType && mediaREs.some(re => re.test(info)))
  }),
  ProseTable: ({ tokens, index, info, component }) => {
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
      ...infoToProps({ info, component, propsInterfaces }),
      totalBodyRows,
      totalColumns,
    }
  },
  ProseList: ({ tokens, index, info, component }) => {
    const rootAndDescendantTokens = tokens.slice(
            index + 1, // ordered_list_open or bullet_list_open token
            index + tokens.slice(index).findIndex(token => ['ordered_list_close', 'bullet_list_close'].includes(token.type)) // This slice excludes the close token. Not a problem, because the close token isn't needed.
          ),
          { tag } = rootAndDescendantTokens[0],
          totalItems = tokens
            .filter(({ type }) => type === 'list_item_open')
            .length
            
    return {
      ...infoToProps({ info, component, propsInterfaces }),
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
