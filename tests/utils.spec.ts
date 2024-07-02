import { test } from '@japa/runner'
import { extractFragment } from '../src/utils.js'

test.group('extractFragment', () => {
  test('simple extraction works', ({ assert }) => {
    const data = `
Before
@fragment('test')
Inside
Inside 2
@end
After`
    const result = extractFragment(data, 'test')
    assert.equal(result, 'Inside\nInside 2')
  })

  test('invalid extraction throws', ({ assert }) => {
    const data = `
Before
@fragment('test')
Inside
@end
After `
    assert.throws(() => extractFragment(data, 'not-test'))
  })

  test('nested extraction works', ({ assert }) => {
    const data = `
Before
@fragment('test')
Inside before
@fragment('inner-test')
Inside inside
@end
Inside after
@end
After`
    const result = extractFragment(data, 'test')
    assert.equal(
      result,
      `Inside before
@fragment('inner-test')
Inside inside
@end
Inside after`
    )
  })
})
