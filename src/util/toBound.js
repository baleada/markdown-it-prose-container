const propsBinders = [
  {
    templateType: 'jsx',
    toBound: props => `{ ...${JSON.stringify(props)} }`
  },
  {
    templateType: 'vue',
    toBound: props => `v-bind="${JSON.stringify(props)}"`
  },
  {
    templateType: 'svelte',
    toBound: props => `{ ...${JSON.stringify(props)} }`
  }
]

export default function(props, templateType) {
  return propsBinders
    .find(({ templateType: t }) => t === templateType)
    .toBound(props)
}
