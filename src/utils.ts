export function extractFragment(content: string, sectionName: string): string {
  const lines = content.split('\n').map((x) => x.trim())

  const found = lines.findIndex(
    (item) =>
      item.startsWith(`@fragment("${sectionName}")`) ||
      item.startsWith(`@fragment('${sectionName}')`)
  )

  if (found < 0) {
    throw new Error(`Fragment ${sectionName} not found`)
  }
  let endCount = 1
  let fragmentEnd = -1
  for (const [i, line] of lines.slice(found + 1).entries()) {
    const isEnd = line.startsWith('@end')
    const isSelfClosedComponent = line.startsWith('@!')
    const isComponent = line.startsWith('@')
    if (isEnd) {
      endCount -= 1
    } else if (isComponent && !isSelfClosedComponent) {
      endCount += 1
    }
    if (endCount === 0) {
      fragmentEnd = i
      break
    }
  }
  if (endCount !== 0) {
    throw new Error('Unbalanced edge template')
  }
  if (fragmentEnd === -1) {
    fragmentEnd = lines.length - 1
  }

  return lines.slice(found + 1, found + fragmentEnd + 1).join('\n')
}
