import type Token from "markdown-it/lib/token";

export function lookupPreviousToken ({ tokens, index }: { tokens: Token[], index: number }): Token | undefined {
  return index === 0 ? undefined : tokens[index - 1]
}
