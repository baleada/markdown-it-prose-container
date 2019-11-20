import { getProps, guessContainerType, toBound } from '../util'

export default function(md, templateType) {
  return (tokens, index) => {
    const { info, nesting } = tokens[index],
          isOpen = nesting === 1,
          nextToken = isOpen ? tokens[index + 1] : undefined,
          nextType = nextToken ? nextToken.type : undefined,
          containerType = guessContainerType({ info, nesting, nextType })

    if (isOpen) {
      const props = getProps(info, containerType, nextToken),
            boundProps = toBound(props, templateType)

      return `<${containerType} ${boundProps}>\n`
    } else {
      return `</${containerType}>\n`
    }
  }
}
