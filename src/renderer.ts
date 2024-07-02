import edge, { Edge } from 'edge.js'
import { extractFragment } from './utils.js'

type Renderer = ReturnType<Edge['createRenderer']>

export const enrichRenderer = (renderer: Renderer): Renderer => {
  const { render, renderSync, renderRaw, renderRawSync } = renderer

  renderer.render = async function (
    combinedPath: string,
    state?: Record<string, any>
  ): Promise<string> {
    const [templatePath, fragmentName] = combinedPath.split('#')

    if (fragmentName) {
      const rawTemplate = edge.loader.resolve(templatePath).template
      const extracted = extractFragment(rawTemplate, fragmentName)
      return renderRaw.apply(renderer, [extracted, state])
    }
    return render.apply(renderer, [templatePath, state])
  }

  renderer.renderSync = function (combinedPath: string, state?: Record<string, any>): string {
    const [templatePath, fragmentName] = combinedPath.split('#')

    if (fragmentName) {
      const rawTemplate = edge.loader.resolve(templatePath).template
      const extracted = extractFragment(rawTemplate, fragmentName)
      return renderRawSync.apply(renderer, [extracted, state])
    }
    return renderSync.apply(renderer, [templatePath, state])
  }

  return renderer
}
