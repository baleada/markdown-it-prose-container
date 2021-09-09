import { readFileSync, statSync, readdirSync } from 'fs'

export function toMetadata () {
  const components = getFiles(`./src/components`),
        metadata = components.map(({ path, name }) => {
          const contents = readFileSync(path, 'utf8'),
                propsMatch = contents.match(/props: {(.|\r?\n)*?\n\s\s}/)

          if (!propsMatch) {
            return { name, interface: {} }
          }

          const propsString = propsMatch[0],
                props = propsString
                  .match(/(\w+): {/g).slice(1)
                  .map(str => str.replace(/: {/g, '')),
                propTypes = propsString
                  .match(/type: (\w+)/g)
                  .map(str => str.replace(/type: /g, '').toLowerCase()),
                metadatum = props.reduce((metadatum, prop, i) => {
                  return {
                    ...metadatum,
                    [prop]: propTypes[i],
                  }
                }, {})

          return { name, interface: metadatum }
        })

  console.log(`Generated ${metadata.length} metadata`)

  return `\
export type Metadatum = {
  name: string,
  props: {
    [key: string]: 'string' | 'boolean' | 'number' | 'array',
  }
}

export const metadata: Metadatum[] = ${JSON.stringify(metadata, null, 2)}`
}

function getFiles(dirPath) {
  return readdirSync(dirPath)
    .filter(file => file.endsWith('vue'))
    .map(file => ({
      path: `${dirPath}/${file}`,
      name: file.split('.')[0],
    }))
}

