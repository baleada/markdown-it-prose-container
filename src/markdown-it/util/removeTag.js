export default function(oldTag) {
  const lastCharacterIsNewline = oldTag[oldTag.length - 1] === '\n',
        lastCharacter = lastCharacterIsNewline ? '\n' : ''

  return lastCharacter
}
