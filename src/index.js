// ::: ...props
import MarkdownItContainer from 'markdown-it-container'
import {
  container,
  heading,
  list,
  listItem,
  table,
  tableDescendant,
} from './rules'

const defaultOptions = {
  marker: ':',
  name: 'prose',
}

/* type Template = 'vue' // | 'jsx' | 'svelte' */

export default function(md, required = {}, options = {}) {
  options = {
    ...defaultOptions,
    ...options,
  }

  const { template } = required,
        { marker, name } = options,
        // Various types of open tokens use the cache to communicate to their corresponding close tokens.
        //
        // It's not necessary to have separate nested cache objects, but the extra level of organization
        // is easier to reason about.
        cache = {
          container: {},
          heading: {},
          list: {},
          table: {},
        }

  md.use(MarkdownItContainer, name, {
    marker,
    validate: () => true,
    render: container(md, { template, cache }),
  })

  // Headings
  md.renderer.rules.heading_open = heading({ md, cache, containerName: name })
  md.renderer.rules.heading_close = heading({ md, cache })

  // Lists
  md.renderer.rules.ordered_list_open = list({ md, cache, containerName: name })
  md.renderer.rules.ordered_list_close = list({ md, cache })
  md.renderer.rules.bullet_list_open = list({ md, cache, containerName: name })
  md.renderer.rules.bullet_list_close = list({ md, cache })
  md.renderer.rules.list_item_open = listItem({ md, cache })
  md.renderer.rules.list_item_close = listItem({ md, cache })

  // Tables
  md.renderer.rules.table_open = table({ md, cache, containerName: name })
  md.renderer.rules.table_close = table({ md, cache })
  md.renderer.rules.thead_open = tableDescendant({ md, template, cache })
  md.renderer.rules.thead_close = tableDescendant({ md, cache })
  md.renderer.rules.tbody_open = tableDescendant({ md, template, cache })
  md.renderer.rules.tbody_close = tableDescendant({ md, cache })
  md.renderer.rules.tr_open = tableDescendant({ md, template, cache })
  md.renderer.rules.tr_close = tableDescendant({ md, cache })
  md.renderer.rules.th_open = tableDescendant({ md, template, cache })
  md.renderer.rules.th_close = tableDescendant({ md, cache })
  md.renderer.rules.td_open = tableDescendant({ md, template, cache })
  md.renderer.rules.td_close = tableDescendant({ md, cache })
}

