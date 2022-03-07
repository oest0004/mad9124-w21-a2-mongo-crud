"use strict"

const debug = require('debug')('A2-MONGO-CRUD')
const mongoose = require("mongoose")

module.exports = () => {
	mongoose
		.connect("mongodb://localhost:27017/A2MongoCrud", {
			useUnifiedTopology: true,
		})
		.then(() => debug("Connected to MongoDB ..."))
		.catch((err) => {
			debug("Problem connecting to MongoDB ...", err.message)
			process.exit(1)
		})
}
