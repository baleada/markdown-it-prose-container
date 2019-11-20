export default function(tokens, index) {
  return index < tokens.length - 1 ? tokens[index + 1] : undefined
}
