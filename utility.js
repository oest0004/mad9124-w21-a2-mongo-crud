function formatResponseData(type, resource) {
	const { id, ...attributes } = resource
	return { type, id, attributes }
}

function sendResourceNotFound(req, res, type) {
  res.status(404).send({
    errors: [
      {
        status: '404',
        title: 'Resource does not exist',
        description: `We could not find a ${type} with id: ${req.params.id}`
      }
    ]
  })
}


module.exports = { formatResponseData, sendResourceNotFound}
