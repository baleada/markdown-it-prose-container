// ::: ...props
import MarkdownItContainer from 'markdown-it-container'
import { container, headingOpen, headingClose, tableOpen, tableDescendant, listOpen, listDescendant } from './renderGetters'

const defaultOptions = {
  marker: ':',
}

export default function(md, required = {}, options = {}) {
  const { templateType, propsInterfaces } = required
  validateTemplateType(templateType)
  validatePropsInterfaces(propsInterfaces)

  options = {
    ...defaultOptions,
    ...options,
  }

  const { marker } = options

  md.use(MarkdownItContainer, 'prose', {
    marker,
    validate: (params) => true,
    render: container(md, { templateType, propsInterfaces }),
  })

  md.renderer.rules.heading_open = headingOpen(md)
  md.renderer.rules.heading_close = headingClose(md)

  md.renderer.rules.table_open = tableOpen(md)
  md.renderer.rules.table_close = tableDescendant(md, 'GridContents', false)
  md.renderer.rules.thead_open = tableDescendant(md, 'Rowgroup', true, templateType)
  md.renderer.rules.thead_close = tableDescendant(md, 'Rowgroup', false)
  md.renderer.rules.tbody_open = tableDescendant(md, 'Rowgroup', true, templateType)
  md.renderer.rules.tbody_close = tableDescendant(md, 'Rowgroup', false)
  md.renderer.rules.tr_open = tableDescendant(md, 'Row', true, templateType)
  md.renderer.rules.tr_close = tableDescendant(md, 'Row', false)
  md.renderer.rules.th_open = tableDescendant(md, 'Columnheader', true, templateType)
  md.renderer.rules.th_close = tableDescendant(md, 'Columnheader', false)
  md.renderer.rules.td_open = tableDescendant(md, 'Gridcell', true, templateType)
  md.renderer.rules.td_close = tableDescendant(md, 'Gridcell', false)

  md.renderer.rules.ordered_list_open = listOpen(md, true, templateType)
  md.renderer.rules.ordered_list_close = listDescendant(md, 'ListContents', false)
  md.renderer.rules.bullet_list_open = listOpen(md, false, templateType)
  md.renderer.rules.bullet_list_close = listDescendant(md, 'ListContents', false)
  md.renderer.rules.list_item_open = listDescendant(md, 'ListItem', true, templateType)
  md.renderer.rules.list_item_close = listDescendant(md, 'ListItem', false)
}

function validateTemplateType (templateType) {
  if (!['jsx', 'svelte', 'vue'].includes(templateType)) {
    throw new Error('invalid templateType: must be one of "jsx", "svelte", or "vue"')
  }
}

function validatePropsInterfaces (propsInterfaces) {
  // assert Object
}
