import { containerTokenToProps, guessComponent, toBound } from '../util'

export default function(md, { template, cache }) {
  return (tokens, index) => {
    const { info, nesting } = tokens[index],
          isOpen = nesting === 1,
          nextToken = tokens[index + 1],
          nextTokenType = nextToken?.type,
          component = guessComponent({ info, nesting, nextTokenType, cache })

    if (isOpen) {
      const props = containerTokenToProps({ tokens, index, info, component, nextToken }),
            boundProps = toBound({ props, template })

      return `<${component} ${boundProps}>\n`
    } else {
      return `</${component}>\n`
    }
  }
}
