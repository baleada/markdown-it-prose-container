const propsBinders = [
  {
    template: 'jsx',
    toBound: props => `{...${singleQuoteStringify(props)}}`
  },
  {
    template: 'vue',
    toBound: props => `v-bind="${singleQuoteStringify(props)}"`
  },
  {
    template: 'svelte',
    toBound: props => `{...${singleQuoteStringify(props)}}`
  }
]

export default function({ props, template }) {
  return propsBinders
    .find(({ template: t }) => t === template)
    .toBound(props)
}

function singleQuoteStringify (props) {
  return JSON.stringify(props).replace(/'/g, "\\'").replace(/"/g, "'")
}
