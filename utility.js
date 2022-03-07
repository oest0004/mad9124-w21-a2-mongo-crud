function formatResponseData(type, resource) {
	const { id, ...attributes } = resource
	return { type, id, attributes }
}

module.exports = { formatResponseData }
