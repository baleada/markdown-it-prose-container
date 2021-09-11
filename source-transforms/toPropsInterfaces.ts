import { resolve, parse } from 'path'
import { readFileSync, readdirSync } from 'fs'
import { config } from 'dotenv'
import { PropsInterface } from 'virtual:propsInterfaces'

config({ path: resolve(__dirname, '../.env') })
const relativePathToVueProse = process.env.RELATIVE_PATH_TO_VUE_PROSE,
      relativePathToComponents = `${relativePathToVueProse}/src/components`




export function toPropsInterfaces () {
  const components = readdirSync(relativePathToComponents),
        propsInterfaces = components.map(component => {
          const contents = readFileSync(`${relativePathToComponents}/${component}`, 'utf8'),
                optionalMatch = contents.match(optionalRE),
                requiredMatch = contents.match(requiredRE)

          // console.log({
          //   optionalMatch: !!optionalMatch,
          //   requiredMatch: !!requiredMatch,
          // })
          
          const optionalProps = toPropsInterface(optionalMatch[1]),
                requiredProps = !!requiredMatch
                  ? toPropsInterface(requiredMatch[1])
                  : {}

          return {
            name: `BaleadaProse${component.replace(/^create/, '').replace(/\.ts$/, '')}`,
            interface: {
              ...optionalProps,
              ...requiredProps
            }
          }
        })

  console.log(`toPropsInterfaces: Scraped props interfaces for ${propsInterfaces.length} components`)

  return `\
export type PropsInterface = {
  [prop: string]: 'string' | 'boolean' | 'number' | 'array',
}

export type Props = {
  [prop: string]: string | boolean | number | string[],
}

export const propsInterfaces: {
  name: 'BaleadaProseAside'
    | 'BaleadaProseBlockquote'
    | 'BaleadaProseCodeblock'
    | 'BaleadaProseDetails'
    | 'BaleadaProseHeading'
    | 'BaleadaProseList'
    | 'BaleadaProseMedia'
    | 'BaleadaProseSection'
    | 'BaleadaProseTable',
  interface: PropsInterface,
}[] = ${JSON.stringify(propsInterfaces, null, 2)}`
}

const optionalRE = /Optional = {((?:.|\s)*?)}/
const requiredRE = /Optional & {((?:.|\s)*?)}/

function toPropsInterface (match: string): PropsInterface {
  return match
    .trim()
    .split('\n')
    .reduce((propsInterface, line) => {
      const [_, prop, value] = line.trim().match(typeAndValueRE),
            type = (() => {
              if (value.startsWith(`'`)) {
                return 'string'
              }

              if (value.startsWith('string[]')) {
                return 'array'
              }

              if (value.startsWith('string')) {
                return 'string'
              }

              if (value.startsWith('number')) {
                return 'number'
              }

              if (value.startsWith('boolean')) {
                return 'boolean'
              }
            })()

      propsInterface[prop] = type

      return propsInterface
    }, {})
}

const typeAndValueRE = /(\w+)\??: (.*)$/

