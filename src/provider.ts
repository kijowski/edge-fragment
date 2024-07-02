import { ApplicationService } from '@adonisjs/core/types'
import edge from 'edge.js'
import { fragmentTag } from './fragment_tag.js'
import { enrichRenderer } from './renderer.js'

export default class HtmxEdgeServiceProvider {
  constructor(protected app: ApplicationService) {}

  async boot() {
    edge.registerTag(fragmentTag)
    edge.onRender(enrichRenderer)
  }
}
