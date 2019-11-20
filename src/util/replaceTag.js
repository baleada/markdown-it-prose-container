export default function replaceTag (oldTag, newTag, isOpen) {
  const lastCharacterIsNewline = oldTag[oldTag.length - 1] === '\n',
        lastCharacter = lastCharacterIsNewline ? '\n' : ''

  return `<${isOpen ? '' : '/'}${newTag}>${lastCharacter}`
}
