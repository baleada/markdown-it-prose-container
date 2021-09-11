// ::: ...props
import MarkdownItContainer from 'markdown-it-container'
import type MarkdownIt from 'markdown-it'
import {
  container,
  heading,
  list,
  listItem,
  table,
  tableDescendant,
} from './rules'

export type Options = {
  marker?: string,
  name?: string,
  template?: 'vue' // | 'jsx' | 'svelte',
}

const defaultOptions: Options = {
  marker: ':',
  name: 'prose',
  template: 'vue',
}

export type Cache = {
  container: {
    component?:
    'BaleadaProseAside'
    | 'BaleadaProseBlockquote'
    | 'BaleadaProseCodeblock'
    | 'BaleadaProseDetails'
    | 'BaleadaProseHeading'
    | 'BaleadaProseList'
    | 'BaleadaProseMedia'
    | 'BaleadaProseSection'
    | 'BaleadaProseTable'
  },
  heading: {
    isInsideProseContainer?: boolean,
  },
  list: {
    isInsideProseContainer?: boolean,
  },
  table: {
    isInsideProseContainer?: boolean,
  },
}

/* type Template = 'vue' // | 'jsx' | 'svelte' */

export const createMarkdownItProseContainer: (options: Options) => MarkdownIt.PluginSimple = options => md => {
  const { marker, name, template } = { ...defaultOptions, ...options },
        // Various types of open tokens use the cache to communicate to their corresponding close tokens.
        //
        // It's not necessary to have separate nested cache objects, but the extra level of organization
        // is easier to reason about.
        cache: Cache = {
          container: {},
          heading: {},
          list: {},
          table: {},
        },
        containerType = `container_${name}_open`

  md.use(MarkdownItContainer, name, {
    marker,
    validate: () => true,
    render: container(md, { template, cache, containerType }),
  })


  // Headings
  md.renderer.rules.heading_open = heading({ md, cache, containerType })
  md.renderer.rules.heading_close = heading({ md, cache })

  // Lists
  md.renderer.rules.ordered_list_open = list({ md, cache, containerType })
  md.renderer.rules.ordered_list_close = list({ md, cache })
  md.renderer.rules.bullet_list_open = list({ md, cache, containerType })
  md.renderer.rules.bullet_list_close = list({ md, cache })
  md.renderer.rules.list_item_open = listItem({ md, cache })
  md.renderer.rules.list_item_close = listItem({ md, cache })

  // Tables
  md.renderer.rules.table_open = table({ md, cache, containerName: name })
  md.renderer.rules.table_close = table({ md, cache })
  md.renderer.rules.thead_open = tableDescendant({ md, cache })
  md.renderer.rules.thead_close = tableDescendant({ md, cache })
  md.renderer.rules.tbody_open = tableDescendant({ md, cache })
  md.renderer.rules.tbody_close = tableDescendant({ md, cache })
  md.renderer.rules.tr_open = tableDescendant({ md, cache })
  md.renderer.rules.tr_close = tableDescendant({ md, cache })
  md.renderer.rules.th_open = tableDescendant({ md, cache })
  md.renderer.rules.th_close = tableDescendant({ md, cache })
  md.renderer.rules.td_open = tableDescendant({ md, cache })
  md.renderer.rules.td_close = tableDescendant({ md, cache })
}
