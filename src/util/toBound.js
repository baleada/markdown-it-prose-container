export default function toBound ({ props, template }) {
  return toBoundByTemplate[template](props)
}

const toBoundByTemplate = {
  jsx: props => `{...${singleQuoteStringify(props)}}`,
  vue: props => `v-bind="${singleQuoteStringify(props)}"`,
  svelte: props => `{...${singleQuoteStringify(props)}}`,
}

function singleQuoteStringify (props) {
  return JSON.stringify(props).replace(/'/g, "\\'").replace(/"/g, "'")
}
