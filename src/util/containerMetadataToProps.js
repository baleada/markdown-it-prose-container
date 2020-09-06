import infoToProps from './infoToProps'

const userEnteredNewlineRE = new RegExp('\\{2,}n', 'g')

export default function({ md, tokens, index, info, component, nextToken }) {
  return infoToPropsByComponent?.[component]({ md, tokens, index, info, component, nextToken }) || infoToProps({ info, component })
  
  // switch (component) {
  // case 'ProseTable':
  //   const tokensAfterTableOpen = tokens.slice(index),
  //         tableCloseIndex = tokensAfterTableOpen.findIndex(({ type }) => type === 'table_close'),
  //         table = tokensAfterTableOpen.slice(0, tableCloseIndex),
  //         tableDescendantOpenTokens = table.filter(({ type }) => ['tr_open', 'th_open', 'td_open'].includes(type)),
  //         rows = tableDescendantOpenTokens
  //           .filter(({ type }) => type === 'tr_open')
  //           .map((token, index) => ({
  //             rowgroup: index === 0 ? 0 : 1,
  //             row: index === 0 ? 0 : index - 1,
  //           })),
  //         columnHeaders = tableDescendantOpenTokens
  //           .filter(({ type }) => type === 'th_open')
  //           .map((token, index) => ({ rowgroup: 0, row: 0, gridcell: index })),
  //         columns = columnHeaders.length,
  //         bodyCells = tableDescendantOpenTokens
  //           .filter(({ type }) => type === 'td_open')
  //           .map((token, index) => ({
  //             rowgroup: 1,
  //             row: Math.floor(index / columns),
  //             gridcell: index - (Math.floor(index / columns) * columns),
  //           })),
  //         gridcells = [...columnHeaders, ...bodyCells]

  //   return {
  //     ...infoToProps({ info, component }),
  //     rows,
  //     gridcells,
  //   }
  // case 'ProseList':
  //   const tokensAfterListOpen = tokens.slice(index),
  //         listCloseIndex = tokensAfterListOpen.findIndex(({ type }) => type === 'ordered_list_close' || type === 'bullet_list_close'),
  //         list = tokensAfterListOpen.slice(0, listCloseIndex),
  //         listItemOpenTokens = list.filter(({ type }) => type === 'list_item_open'),
  //         listItems = listItemOpenTokens
  //           .map((token, index) => ({
  //             listItem: index,
  //           }))

  //   return {
  //     ...infoToProps({ info, component }),
  //     listItems,
  //   }
  // default:
  //   return infoToProps({ info, component })
  // }
}

const infoToPropsByComponent = {
  ProseCodeblock: ({ md, tokens, index, info, component, nextToken }) => ({
    ...infoToProps({ info, component }),
    lang: tokens[index + 1].info,
    lines: tokens[index + 1].content.replace(userEnteredNewlineRE, '').split('\n').length - 1
  }),
  ProseHeading: ({ md, tokens, index, info, component, nextToken }) => ({
    ...infoToProps({ info, component }),
    level: nextToken && Number(nextToken.tag[1])
  }),
  ProseTable: ({ md, tokens, index, info, component, nextToken }) => {},
  ProseList: ({ md, tokens, index, info, component, nextToken }) => {
    const rootAndItemTokens = tokens.slice(
            index + 1, // ordered_list_open or bullet_list_open token
            tokens.findIndex(({ type }) => type === 'ordered_list_close' || type === 'bullet_list_close') + 1 // include the close token just to make this easier to reason about
          ),
          tag = (rootAndItemTokens[0].type === 'ordered_list_open' && 'ol') ||
                (rootAndItemTokens[0].type === 'bullet_list_open' && 'ul'),
          totalItems = tokens
            .slice(1, listAndItemTokens.length - 1) // without opening and closing ol/ul tag
            .length

    return {
      ...infoToProps({ info, component }),
      tag,
      totalItems,
    }
  },
}


