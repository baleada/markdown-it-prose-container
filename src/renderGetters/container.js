import { getNextToken, guessContainerType, toBound, toProps } from '../util'

export default function(md, templateType) {
  return (tokens, index) => {
    const { info, nesting } = tokens[index],
          nextToken = getNextToken(tokens, index),
          nextType = nextToken ? nextToken.type : undefined,
          containerType = guessContainerType({ info, nesting, nextType }),
          props = containerType === 'ProseHeading'
            ? { level: nextToken && Number(nextToken.tag[1]) }
            : toProps(info, containerType),
          boundProps = toBound(props, templateType)

    return nesting === 1
      ? `<${containerType} ${boundProps}>\n`
      : `</${containerType}>\n`
  }
}
