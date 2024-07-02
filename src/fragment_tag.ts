import type { TagContract } from 'edge.js/types'

export const fragmentTag: TagContract = {
  block: true,
  seekable: true,
  tagName: 'fragment',
  compile(parser, buffer, token) {
    token.children.forEach((child) => {
      parser.processToken(child, buffer)
    })
  },
}
