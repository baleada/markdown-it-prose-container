// ::: ...props
import MarkdownItContainer from 'markdown-it-container'
import guessContainerType from './util/guessContainerType'
import toBound from './util/toBound'
import toProps from './util/toProps'

const validTemplateTypes = ['jsx', 'svelte', 'vue'],
      defaultOptions = {
        marker: ':',
      }

export default function(md, templateType, options = {}) {
  try {
    templateType = templateType.toLowerCase()
  } catch (error) {
    throw error
  }

  if (!validTemplateTypes.includes(templateType)) {
    throw new Error('invalid templateType')
  }

  options = {
    ...defaultOptions,
    ...options,
  }

  const { marker } = options

  md.use(MarkdownItContainer, 'prose', {
    marker,
    validate: (params) => true,
    render: getRenderProseContainer(md, templateType),
  })
}

function getRenderProseContainer (md, templateType) {
  return (tokens, index) => {
    const { info, nesting } = tokens[index],
          nextType = index < tokens.length - 1 ? tokens[index + 1].type : undefined,
          containerType = guessContainerType({ info, nesting, nextType }),
          props = toProps(info, containerType),
          boundProps = toBound(props, templateType)

    return nesting === 1
      ? `<${containerType} ${boundProps}>\n`
      : `</${containerType}>\n`
  }
}
