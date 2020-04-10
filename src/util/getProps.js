import toProps from './toProps'

const writtenNewlineRegexp = new RegExp('\\{2,}n', 'g')

export default function({ tokens, index, info, containerType, nextToken, propsInterfaces }) {
  switch (containerType) {
  case 'ProseCodeblock':
    return {
      ...toProps({ info, containerType, propsInterfaces }),
      lines: tokens[index + 1].content.replace(writtenNewlineRegexp, '').split('\n').length - 1
    }
  case 'ProseHeading':
    return {
      ...toProps({ info, containerType, propsInterfaces }),
      level: nextToken && Number(nextToken.tag[1])
    }
  case 'ProseGrid':
    const tokensAfterTableOpen = tokens.slice(index),
          tableCloseIndex = tokensAfterTableOpen.findIndex(({ type }) => type === 'table_close'),
          table = tokensAfterTableOpen.slice(0, tableCloseIndex),
          tableDescendantOpenTokens = table.filter(({ type }) => ['tr_open', 'th_open', 'td_open'].includes(type)),
          rows = tableDescendantOpenTokens
            .filter(({ type }) => type === 'tr_open')
            .map((token, index) => ({
              rowgroup: index === 0 ? 0 : 1,
              row: index === 0 ? 0 : index - 1,
            })),
          columnHeaders = tableDescendantOpenTokens
            .filter(({ type }) => type === 'th_open')
            .map((token, index) => ({ rowgroup: 0, row: 0, gridcell: index })),
          columns = columnHeaders.length,
          bodyCells = tableDescendantOpenTokens
            .filter(({ type }) => type === 'td_open')
            .map((token, index) => ({
              rowgroup: 1,
              row: Math.floor(index / columns),
              gridcell: index - (Math.floor(index / columns) * columns),
            })),
          gridcells = [...columnHeaders, ...bodyCells]

    return {
      ...toProps({ info, containerType, propsInterfaces }),
      rows,
      gridcells,
    }
  case 'ProseList':
    const tokensAfterListOpen = tokens.slice(index),
          listCloseIndex = tokensAfterListOpen.findIndex(({ type }) => type === 'ordered_list_close' || type === 'bullet_list_close'),
          list = tokensAfterListOpen.slice(0, listCloseIndex),
          listDescendantOpenTokens = list.filter(({ type }) => type === 'list_item_open'),
          listItems = listDescendantOpenTokens
            .map((token, index) => ({
              listItem: index,
            }))

    return {
      ...toProps({ info, containerType, propsInterfaces }),
      listItems,
    }
  default:
    return toProps({ info, containerType, propsInterfaces })
  }
}
