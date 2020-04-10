export default function(type, tokens, index) {
  return tokens
    .slice(0, index)
    .reverse()
    .findIndex(({ type: t }) => t === `${type}_open`)
}
