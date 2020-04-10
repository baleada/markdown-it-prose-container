export default function(tokens, index) {
  return index === 0 ? undefined : tokens[index - 1]
}
