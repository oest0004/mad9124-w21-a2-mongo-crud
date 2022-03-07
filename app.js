// Don't forget to use NPM to install Express and Mongoose.

const debug = require('debug')('A2-MONGO-CRUD')
const morgan = require('morgan')
const express = require('express')

require('./startup/connectDatabase')() // IIFE

const studentsRouter = require("./routes/studentsRouter")
const coursesRouter = require("./routes/coursesRouter")

const app = express()

app.use(morgan("tiny"))
app.use(express.json())

app.use("/api/students", studentsRouter)
app.use("/api/courses", coursesRouter)

const port = process.env.port || 3030
app.listen(port, () => console.log(`Server listening on port ${port} ...`))
