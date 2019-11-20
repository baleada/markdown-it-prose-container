import toProps from './toProps'

export default function(info, containerType, nextToken) {
  switch (true) {
  case containerType === 'ProseHeading':
    return { level: nextToken && Number(nextToken.tag[1]) }
  case containerType === 'ProseList':
    return { isOrdered: nextToken && nextToken.type === 'ordered_list_open' }
  default:
    return toProps(info, containerType)
  }
}
