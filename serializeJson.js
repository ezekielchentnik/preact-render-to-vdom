export default (el) => {
    if (el.nodeType===3) return el.nodeValue;
    var attributes = {},
			a = el.attributes;
		if (el.className) attributes.class = el.className;
    for (let i=0; i<a.length; i++) attributes[a[i].name] = a[i].value;
		return {
			nodeName: String(el.nodeName).toLowerCase(),
			attributes,
			children: el.childNodes.map(serializeJson)
		};
}
