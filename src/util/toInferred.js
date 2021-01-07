const inferredByNextTokenType = {
        fence: 'ProseCodeblock',
        heading_open: 'ProseHeading',
        table_open: 'ProseTable',
        blockquote_open: 'ProseBlockquote',
        ordered_list_open: 'ProseList',
        bullet_list_open: 'ProseList',
      }

export default function toInferred ({ info, nesting, nextTokenType, cache }) {
  const isOpen = nesting === 1

  if (!isOpen) {
    return cache.container.component
    // No need to reset cache after processing the close token,
    // because the next open token will set it appropriately
  }

  const inferred = inferredByNextTokenType[nextTokenType] || fromInfo(info)
  cache.container.component = inferred

  return inferred
}


function fromInfo (info) {
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
