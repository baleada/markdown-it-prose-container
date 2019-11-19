// ::: ...props
import MarkdownItContainer from 'markdown-it-container'
import guessContainerType from './util/guessContainerType'
import toBound from './util/toBound'
import toProps from './util/toProps'

const defaultOptions = {
  marker: ':',
}

export default function(md, options = {}) {
  options = {
    ...defaultOptions,
    ...options,
  }

  const { marker, templateType } = options

  md.use(MarkdownItContainer, 'prose', {
    marker,
    render: renderProseContainer(md, templateType),
  })
}

function renderProseContainer (md, templateType) {
  return (tokens, index) => {
    const { info, nesting } = tokens[index],
          nextType = tokens[index + 1].type,
          containerType = guessContainerType({ info, nesting, nextType }),
          props = toProps(info, containerType),
          boundProps = toBound(props, templateType)

    return nesting === 1
      ? `<${containerType} ${boundProps}>\n`
      : `</${containerType}>`
  }
}
