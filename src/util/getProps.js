import toProps from './toProps'

export default function({ info, containerType, nextToken, propsInterfaces }) {
  switch (true) {
  case containerType === 'ProseHeading':
    return { level: nextToken && Number(nextToken.tag[1]) }
  default:
    return toProps({ info, containerType, propsInterfaces })
  }
}
