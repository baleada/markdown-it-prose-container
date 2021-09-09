import { propsInterfaces } from 'virtual:proseMetadata'
import type { Props } from 'virtual:proseMetadata'
import type Token from "markdown-it/lib/token"
import type { Cache } from '../createMarkdownItProseContainer'

export function infoToProps (
  { info, component }: {
    info: Token['info'],
    component: Cache['container']['component']
  }
): Props {
  const attributes = info.match(/(\w*?=(".*?"|\w+|\[.*?\])|\w+)/g),
        propsInterface = propsInterfaces.find(({ name }) => name === component).interface

  return attributes === null
    ? {}
    : attributes
      .map(match => {
        const prop = match.match(/^\w+/)[0],
              group = (match.match(/=(.+)$/) !== null && match.match(/=(.+)$/)[1]) || undefined
        return { prop, group }
      })
      .filter(({ prop }) => propsInterface.hasOwnProperty(prop))
      .reduce<Props>((props, { prop, group }) => {
        const propType = propsInterface[prop],
              value = (() => {
                switch (propType) {
                  case 'string':
                    return group
                  case 'number':
                    return Number(group)
                  case 'boolean':
                    return group === undefined
                      || group === 'true'
                      || group
                        .replace(/^"/, '')
                        .replace(/"$/, '') === 'true'
                  case 'array':
                    return group
                      .replace(/^\[/, '')
                      .replace(/\]$/, '')
                      .split(',')
                }
              })()

        return {
          ...props,
          [prop]: value
        }
      }, {})
}
