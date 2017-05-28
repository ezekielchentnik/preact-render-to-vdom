const VOID_ELEMENTS = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
]

const ESC = {
  '&': 'amp',
  '<': 'lt',
  '>': 'gt',
  '"': 'quot',
  "'": 'apos'
}

const encode = (s) => s.replace(/[&'"<>]/g, (a) => `&${ESC[a]}`)

const attr = (a) => {
  if (a.name === 'class' && a.value === '') {
    return ''
  }
  return ` ${a.name.replace(/^html/, '')}${a.value === 'true' || a.value === '' ? '' : `="${encode(a.value)}"`}`
}

const serializeHtml = (el) => {
  const { nodeType, nodeName, textContent, attributes, childNodes, innerHTML } = el
  const normalizedNodeName = nodeName.toLowerCase()
  if (nodeType === 3) {
    return encode(textContent)
  }
  const start = `<${normalizedNodeName}${attributes.map(attr).join('')}`
  if (VOID_ELEMENTS.includes(normalizedNodeName)) {
    return `${start} />`
  }
  return `${start}>${innerHTML || childNodes.map(serializeHtml).join('')}</${normalizedNodeName}>`
}

export default serializeHtml
