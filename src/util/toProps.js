const propsInterfaces = [
  {
    name: 'ProseAside',
    interface: {
      type: 'string'
    }
  },
  {
    name: 'ProseBlockquote',
    interface: {
      isTweetable: 'boolean',
      tweetText: 'string',
      tweetHashtags: 'array',
    }
  },
  {
    name: 'ProseCodeblock',
    interface: {
    }
  },
  {
    name: 'ProseDetails',
    interface: {
      summary: 'string'
    }
  },
  {
    name: 'ProseGrid',
    interface: {
      canFilterByQuery: 'boolean',
      filterQueryIsCaseSensitive: 'boolean',
      ariaLabel: 'string',
    }
  },
  {
    name: 'ProseHeading',
    interface: {
      level: 'number'
    }
  },
  {
    name: 'ProseSection',
    interface: {
    }
  },
],
      propParsers = {
        array: group => group.replace(/^\[/, '').replace(/\]$/, '').split(','),
        boolean: group => group === undefined || group === 'true',
        date: group => group,
        'function': group => group,
        map: group => group,
        number: group => Number(group),
        object: group => group,
        string: group => group.replace(/^"/, '').replace(/"$/, ''),
      }

export default function(info, containerType) {
  const attributes = info.match(/(\w*?=(".*?"|\w+|\[.*?\])|\w+)/g),
        propsInterface = propsInterfaces.find(({ name }) => name === containerType).interface

  return attributes === null
    ? {}
    : attributes
      .map(match => {
        const prop = match.match(/^\w+/)[0],
              group = (match.match(/=(.+)$/) !== null && match.match(/=(.+)$/)[1]) || undefined
        return { prop, group }
      })
      .filter(({ prop, group }) => propsInterface.hasOwnProperty(prop))
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
