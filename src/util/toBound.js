const propsBinders = [
  {
    templateType: 'jsx',
    toBound: props => `{...${singleQuoteStringify(props)}}`
  },
  {
    templateType: 'vue',
    toBound: props => `v-bind="${singleQuoteStringify(props)}"`
  },
  {
    templateType: 'svelte',
    toBound: props => `{...${singleQuoteStringify(props)}}`
  }
]

export default function(props, templateType) {
  return propsBinders
    .find(({ templateType: t }) => t === templateType)
    .toBound(props)
}

function singleQuoteStringify (props) {
  return JSON.stringify(props).replace(/"/g, '\'')
}
