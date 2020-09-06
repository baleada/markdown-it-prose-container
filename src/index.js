// ::: ...props
import MarkdownItContainer from 'markdown-it-container'
import { container, headingOpen, headingClose, tableOpen, tableDescendant, listOpen, listDescendant } from './renderGetters'

const defaultOptions = {
  marker: ':',
}

/* type TemplateType = 'vue' // | 'jsx' | 'svelte' */

export default function(md, required = {}, options = {}) {
  const { templateType } = required

  options = {
    ...defaultOptions,
    ...options,
  }

  const { marker } = options,
        state = {
          container: {},
          list: {},
        }

  md.use(MarkdownItContainer, 'prose', {
    marker,
    validate: () => true,
    render: container(md, { templateType, state }),
  })

  // Headings
  md.renderer.rules.heading_open = headingOpen({ md, state })
  md.renderer.rules.heading_close = headingClose({ md, state })

  // Tables
  md.renderer.rules.table_open = tableOpen({ md, state })
  md.renderer.rules.table_close = tableDescendant({ md, isOpen: false, state })
  md.renderer.rules.thead_open = tableDescendant({ md, isOpen: true, templateType, state })
  md.renderer.rules.thead_close = tableDescendant({ md, isOpen: false, state })
  md.renderer.rules.tbody_open = tableDescendant({ md, isOpen: true, templateType, state })
  md.renderer.rules.tbody_close = tableDescendant({ md, isOpen: false, state })
  md.renderer.rules.tr_open = tableDescendant({ md, isOpen: true, templateType, state })
  md.renderer.rules.tr_close = tableDescendant({ md, isOpen: false, state })
  md.renderer.rules.th_open = tableDescendant({ md, isOpen: true, templateType, state })
  md.renderer.rules.th_close = tableDescendant({ md, isOpen: false, state })
  md.renderer.rules.td_open = tableDescendant({ md, isOpen: true, templateType, state })
  md.renderer.rules.td_close = tableDescendant({ md, isOpen: false, state })

  // Lists
  md.renderer.rules.ordered_list_open = listOpen({ md, isOpen: true, state })
  md.renderer.rules.ordered_list_close = listDescendant({ md, isOpen: false, state })
  md.renderer.rules.bullet_list_open = listOpen({ md, isOpen: true, state })
  md.renderer.rules.bullet_list_close = listDescendant({ md, isOpen: false, state })
  md.renderer.rules.list_item_open = listDescendant({ md, isOpen: true, state })
  md.renderer.rules.list_item_close = listDescendant({ md, isOpen: false, state })
}

