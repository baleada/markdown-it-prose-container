const state = {},
      componentNextTypes = {
        fence: 'ProseCodeblock',
        heading_open: 'ProseHeading',
        table_open: 'ProseGrid',
        blockquote_open: 'ProseBlockquote',
        ordered_list_open: 'ProseList',
        bullet_list_open: 'ProseList',
      }

export default function guessContainerType ({ info, nesting, nextType }) {
  if (nesting === 1) {
    const containerType = componentNextTypes[nextType] || toContainerType(info)
    state.previousContainerType = containerType
    return containerType
  } else {
    return state.previousContainerType
  }
}

/* toContainerType */
const componentConditions = [
  {
    name: 'ProseAside',
    condition: info => /\s*?type="(?:info|warning|danger|success)"/.test(info)
  },
  {
    name: 'ProseMedia',
    condition: info => /\s*?type="(?:image|video|audio)"/.test(info)
  },
  {
    name: 'ProseDetails',
    condition: info => /^\s*?summary=/.test(info),
  }
]

function toContainerType (info) {
  const component = componentConditions.find(({ name, condition }) => condition(info))
  return (component && component.name) || 'ProseSection'
}
