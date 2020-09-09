const componentsByNextTokenType = {
        fence: 'ProseCodeblock',
        heading_open: 'ProseHeading',
        table_open: 'ProseTable',
        blockquote_open: 'ProseBlockquote',
        ordered_list_open: 'ProseList',
        bullet_list_open: 'ProseList',
      }

export default function guessComponent ({ info, nesting, nextTokenType, cache }) {
  const isOpen = nesting === 1

  if (!isOpen) {
    return cache.container.component
    // No need to reset cache after processing the close token,
    // because the next open token will set it appropriately
  }

  const component = componentsByNextTokenType[nextTokenType] || toComponent(info)
  cache.container.component = component

  return component
}


function toComponent (info) {
  const component = componentConditions.find(({ condition }) => condition(info))
  return component?.name || 'ProseSection'
}

const componentConditions = [
  {
    name: 'ProseAside',
    condition: info => /\s*?(?:type=(?:info|warning|danger|success|simple)|type="(?:info|warning|danger|success|simple)")/.test(info)
  },
  {
    name: 'ProseMedia',
    condition: info => /\s*?(?:type="(?:image|img|video|audio|embed|iframe)"|type=(?:image|img|video|audio|embed|iframe))/.test(info)
  },
  {
    name: 'ProseDetails',
    condition: info => /^\s*?summary=/.test(info),
  }
]
