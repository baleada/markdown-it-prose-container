import toProps from './toProps'

export default function({ tokens, index, info, containerType, nextToken, propsInterfaces }) {
  switch (true) {
  case containerType === 'ProseHeading':
    return { level: nextToken && Number(nextToken.tag[1]) }
  case containerType === 'ProseGrid':
    const tokensAfter = tokens.slice(index),
          tableCloseIndex = tokensAfter.findIndex(({ type }) => type === 'table_close'),
          table = tokensAfter.slice(0, tableCloseIndex),
          openTokens = table.filter(({ type }) => ['tr_open', 'th_open', 'td_open'].includes(type)),
          rows = openTokens
            .filter(({ type }) => type === 'tr_open')
            .map((token, index) => ({
              rowgroup: index === 0 ? 0 : 1,
              row: index === 0 ? 0 : index - 1,
            })),
          columnHeaders = openTokens
            .filter(({ type }) => type === 'th_open')
            .map((token, index) => ({ rowgroup: 0, row: 0, gridcell: index })),
          columns = columnHeaders.length,
          bodyCells = openTokens
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
  default:
    return toProps({ info, containerType, propsInterfaces })
  }
}
