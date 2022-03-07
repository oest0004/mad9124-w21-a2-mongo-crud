const express = require("express")
const router = express.Router()
const utility = require("../utility")
const debug = require("debug")("A2-MONGO-CRUD:student")
const Student = require("../models/Student")

router.get("/", async (req, res) => {
	const students = await Student.find().lean()
	res.json({
		data: students.map((student) =>
			utility.formatResponseData("students", student)
		),
	})
})

router.post("/", async (req, res) => {
		let attributes = req.body.data
		delete attributes._id

		let newStudent = new Student(attributes)
		await newStudent.save()

		res.status(201).json({
			data: utility.formatResponseData("students", newStudent),
		})
})

router.get("/:id", async (req, res) => {
	try {
    const student = await Student.findById(req.params.id).lean()
    if(!student) throw new error('Resource not found')
    res.json({data:utility.formatResponseData("students",student)})
	} catch (err) {
		utility.sendResourceNotFound(req, res, "student")
	}
})

router.patch("/:id", async (req, res) => {
	try {
	} catch (err) {}
})

router.put("/:id", async (req, res) => {
	try {
	} catch (err) {}
})

router.delete("/:id", async (req, res) => {
	try {
	} catch (err) {}
})

module.exports = router
