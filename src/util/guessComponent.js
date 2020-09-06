const componentsByNextTokenType = {
        fence: 'ProseCodeblock',
        heading_open: 'ProseHeading',
        table_open: 'ProseTable',
        blockquote_open: 'ProseBlockquote',
        ordered_list_open: 'ProseList',
        bullet_list_open: 'ProseList',
      }

export default function guessComponent ({ info, nesting, nextTokenType, state }) {
  const isOpen = nesting === 1

  if (!isOpen) {
    return state.container.component
  }

  const component = componentsByNextTokenType[nextTokenType] || toComponent(info)
  state.container.component = component

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
    condition: info => /\s*?(?:type="(?:image|video|audio)"|type=(?:image|video|audio))/.test(info)
  },
  {
    name: 'ProseDetails',
    condition: info => /^\s*?summary=/.test(info),
  }
]
