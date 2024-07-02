import { test } from '@japa/runner'
import { fragmentTag } from '../src/fragment_tag.js'
import edge from 'edge.js'
import { enrichRenderer } from '../src/renderer.js'

test.group('fragmentTag', () => {
  edge.registerTag(fragmentTag)
  edge.onRender(enrichRenderer)
  test('simple extraction works', ({ assert }) => {
    const input = `Before
@fragment("test")
Inside
@end
After`
    const result = edge.renderRawSync(input)
    assert.equal(
      result,
      `Before
Inside
After`
    )
  })
})
