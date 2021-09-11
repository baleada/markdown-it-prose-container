declare module 'virtual:proseInterfaces' {
  export type PropsInterface = {
    [prop: string]: 'string' | 'boolean' | 'number' | 'array',
  }
  
  export type Props = {
    [prop: string]: string | boolean | number | string[],
  }

  export const propsInterfaces: {
    name: 'BaleadaProseAside'
      | 'BaleadaProseBlockquote'
      | 'BaleadaProseCodeblock'
      | 'BaleadaProseDetails'
      | 'BaleadaProseHeading'
      | 'BaleadaProseList'
      | 'BaleadaProseMedia'
      | 'BaleadaProseSection'
      | 'BaleadaProseTable',
    interface: PropsInterface,
  }[]
}
