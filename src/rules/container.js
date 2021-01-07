import { containerTokenToProps, toInferred, toBound } from '../util'

export default function(md, { template, cache, containerType }) {
  return (tokens, index) => {
    const { info, nesting } = tokens[index],
          isOpen = nesting === 1,
          nextToken = tokens[index + 1],
          nextTokenType = nextToken?.type,
          component = toInferred({ info, nesting, nextTokenType, cache })

    if (isOpen) {
      const props = containerTokenToProps({ tokens, index, info, component, nextToken, containerType }),
            boundProps = toBound({ props, template })

      return `<${component} ${boundProps}>\n`
    } else {
      return `</${component}>\n`
    }
  }
}
