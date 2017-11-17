import { h, render } from 'preact' // eslint-disable-line no-unused-vars
import undom from 'undom'
import serializeHtml from './serializeHtml'

let doc
export default () => {
  if (!doc) {
    doc = undom()
    Object.assign(global, doc.defaultView)
  }

  let root
  const parent = doc.createElement('x-root')
  doc.body.appendChild(parent)

  const instance = {  // todo: promisify this
    render: (jsx) => {
      root = render(jsx, parent, root)
      return instance
    },
    toHtml: () => serializeHtml(root),
    tearDown: () => render(h('nothing'), parent, root).remove()
  }
  return instance
}
