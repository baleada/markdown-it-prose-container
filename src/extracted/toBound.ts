import type { Props } from "virtual:propsInterfaces"
import type { Options } from "../createMarkdownItProseContainer"

export function toBound (
  { props, template }: {
    props: Props,
    template: Options['template']
  }
): string {
  switch (template) {
    case 'vue':
      return `v-bind="${singleQuoteStringify(props)}"`
    // case 'jsx':
    // case 'svelte':
    //   return `{...${singleQuoteStringify(props)}}`
  }
}

function singleQuoteStringify (props) {
  return JSON.stringify(props).replace(/'/g, "\\'").replace(/"/g, "'")
}
