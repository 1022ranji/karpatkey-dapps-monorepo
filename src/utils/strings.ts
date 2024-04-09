export const reduceSentenceByLengthInLines = (sentence: string, length: number) => {
  const words = sentence.split(/(?=-| )/)
  const lines: string[] = []
  let currentLine = ''

  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    const newLine = word.includes('-')
      ? `${currentLine.trim()}${word.trim()}`
      : `${currentLine.trim()} ${word.trim()}`

    if (newLine.length > length) {
      if (currentLine.length !== 0) {
        lines.push(currentLine.trim())
      }
      currentLine = word
    } else {
      currentLine = newLine
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine.trim())
  }

  return lines
}
