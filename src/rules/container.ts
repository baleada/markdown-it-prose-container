import type MarkdownIt from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer'
import type { Options, Cache } from '../createMarkdownItProseContainer'
import { containerTokenToProps, toInferred, toBound } from '../extracted'

export function container (
  md: MarkdownIt,
  { template, cache, containerType }: {
    template: Options['template'],
    cache: Cache,
    containerType: string,
  }
): RenderRule {
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
