import { containerTokenToProps, guessComponent, toBound } from '../util'

export default function(md, { templateType, state }) {
  return (tokens, index) => {
    const { info, nesting } = tokens[index],
          isOpen = nesting === 1,
          nextToken = tokens[index + 1],
          nextTokenType = nextToken?.type,
          component = guessComponent({ info, nesting, nextTokenType, state })

    if (isOpen) {
      const props = containerTokenToProps({ tokens, index, info, component, nextToken }),
            boundProps = toBound({ props, templateType })

      return `<${component} ${boundProps}>\n`
    } else {
      return `</${component}>\n`
    }
  }
}
