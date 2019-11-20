// ::: ...props
import MarkdownItContainer from 'markdown-it-container'
import { container, headingOpen, headingClose, tableOpen, tableDescendant, listOpen, listDescendant } from './renderGetters'

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
    render: container(md, templateType),
  })

  md.renderer.rules.heading_open = headingOpen(md)
  md.renderer.rules.heading_close = headingClose(md)

  md.renderer.rules.table_open = tableOpen(md)
  md.renderer.rules.table_close = tableDescendant(md, 'GridContents', false)
  md.renderer.rules.thead_open = tableDescendant(md, 'Rowgroup', true)
  md.renderer.rules.thead_close = tableDescendant(md, 'Rowgroup', false)
  md.renderer.rules.tbody_open = tableDescendant(md, 'Rowgroup', true)
  md.renderer.rules.tbody_close = tableDescendant(md, 'Rowgroup', false)
  md.renderer.rules.tr_open = tableDescendant(md, 'Row', true)
  md.renderer.rules.tr_close = tableDescendant(md, 'Row', false)
  md.renderer.rules.th_open = tableDescendant(md, 'Columnheader', true)
  md.renderer.rules.th_close = tableDescendant(md, 'Columnheader', false)
  md.renderer.rules.td_open = tableDescendant(md, 'Gridcell', true)
  md.renderer.rules.td_close = tableDescendant(md, 'Gridcell', false)

  md.renderer.rules.ordered_list_open = listOpen(md)
  md.renderer.rules.ordered_list_close = listDescendant(md, 'ListContents', false)
  md.renderer.rules.bullet_list_open = listOpen(md)
  md.renderer.rules.bullet_list_close = listDescendant(md, 'ListContents', false)
  md.renderer.rules.list_item_open = listDescendant(md, 'ListItem', true)
  md.renderer.rules.list_item_close = listDescendant(md, 'ListItem', false)

}
