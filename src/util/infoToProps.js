const propParsers = {
  array: group => group
    .replace(/^\[/, '')
    .replace(/\]$/, '')
    .split(','),
  boolean: group => 
    group === undefined
    ||
    group === 'true'
    ||
    group
      .replace(/^"/, '')
      .replace(/"$/, '') === 'true',
  date: group => group,
  'function': group => group,
  map: group => group,
  number: group => Number(group),
  object: group => group,
  string: group => group
    .replace(/^"/, '')
    .replace(/"$/, ''),
}

export default function({ info, component, propsInterfaces }) {
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
      .reduce((props, { prop, group }) => {
        const propType = propsInterface[prop],
              parse = propParsers[propType],
              value = parse(group)

        return {
          ...props,
          [prop]: value
        }
      }, {})
}
