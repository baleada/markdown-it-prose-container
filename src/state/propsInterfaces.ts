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
}[] = [
  {
    "name": "BaleadaProseAside",
    "interface": {
      "type": "string",
      "classes": "string"
    }
  },
  {
    "name": "BaleadaProseBlockquote",
    "interface": {
      "readerCanTweet": "boolean",
      "tweetText": "string",
      "tweetUrl": "string",
      "tweetVia": "string",
      "tweetHashtags": "array",
      "classes": "string"
    }
  },
  {
    "name": "BaleadaProseCodeblock",
    "interface": {
      "readerCanCopy": "boolean",
      "showsLang": "boolean",
      "showsLineNumbers": "boolean",
      "classes": "string",
      "totalLines": "number",
      "lang": "string"
    }
  },
  {
    "name": "BaleadaProseDetails",
    "interface": {
      "classes": "string",
      "summary": "string"
    }
  },
  {
    "name": "BaleadaProseHeading",
    "interface": {
      "readerCanCopy": "boolean",
      "classes": "string",
      "level": "number",
      "isFirst": "boolean"
    }
  },
  {
    "name": "BaleadaProseList",
    "interface": {
      "readerCanSearch": "boolean",
      "searchIsCaseSensitive": "boolean",
      "readerCanChangeSearchCaseSensitivity": "boolean",
      "minimumSearchScore": "number",
      "classes": "string",
      "tag": "string",
      "totalItems": "number"
    }
  },
  {
    "name": "BaleadaProseMedia",
    "interface": {
      "classes": "string",
      "type": "string",
      "isFirst": "boolean",
      "src": "string",
      "ariaLabel": "string"
    }
  },
  {
    "name": "BaleadaProseSection",
    "interface": {
      "classes": "string"
    }
  },
  {
    "name": "BaleadaProseTable",
    "interface": {
      "readerCanSearch": "boolean",
      "searchIsCaseSensitive": "boolean",
      "minimumSearchScore": "number",
      "readerCanChangeSearchCaseSensitivity": "boolean",
      "classes": "string",
      "totalBodyRows": "number",
      "totalColumns": "number",
      "ariaLabel": "string"
    }
  }
]