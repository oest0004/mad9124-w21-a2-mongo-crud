const debug = require("debug")("A2-MONGO-CRUD:student")
const express = require("express")
const router = express.Router()
const utility = require("../utility")
const sanitizeMongo = require('express-mongo-sanitize')
const sanitizeBody = require("../middleware/sanitizeBody")
const Student = require("../models/Student")

router.get("/", async (req, res) => {
	const students = await Student.find().lean()
	res.json({
		data: students.map((student) =>
			utility.formatResponseData("students", student)
		),
	})
})

// POST
router.post("/", sanitizeMongo(), sanitizeBody, async (req, res) => {
	let newStudent = new Student(req.sanitizedBody)
	await newStudent.save()

	res.status(201).json({
		data: utility.formatResponseData("students", newStudent),
	})
})

// GET single
router.get("/:id", async (req, res) => {
	try {
		const student = await Student.findById(req.params.id).lean()
		if (!student) throw new error("Resource not found")
		res.json({ data: utility.formatResponseData("students", student) })
	} catch (err) {
		utility.sendResourceNotFound(req, res, "student")
	}
})

// PATCH
router.patch("/:id", sanitizeMongo(), sanitizeBody, async (req, res) => {
	try {
		const { _id, ...otherAttributes } = req.sanitizedBody
		const student = await Student.findByIdAndUpdate(
			req.params.id,
			{ _id: req.params.id, ...otherAttributes },
			{
				new: true,
				runValidators: true,
			}
		)
		if (!student) throw new Error("Resource not found")
		res.json({ data: utility.formatResponseData("students", student) })
	} catch (err) {
    debug(err)
		utility.sendResourceNotFound(req, res, "student")
	}
})

// PUT
router.put("/:id", sanitizeMongo(), sanitizeBody, async (req, res) => {
	try {
		const { _id, ...otherAttributes } = req.sanitizedBody
		const student = await Student.findByIdAndUpdate(
			req.params.id,
			{ _id: req.params.id, ...otherAttributes },
			{
				new: true,
        overwrite: true,
				runValidators: true,
			}
		)
		if (!student) throw new Error("Resource not found")
		res.json({ data: utility.formatResponseData("students", student) })
	} catch (err) {
		utility.sendResourceNotFound(req, res, "student")
	}
})

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const car = await Student.findByIdAndRemove(req.params.id)
    if (!student) throw new Error('Resource not found')
    res.json({data: utility.formatResponseData(student)})
  } catch (err) {
    utility.sendResourceNotFound(req, res,"student")
  }
})

module.exports = router
