const debug = require("debug")("A2-MONGO-CRUD:course")
const express = require("express")
const router = express.Router()
const utility = require("../utility")
const sanitizeMongo = require('express-mongo-sanitize')
const sanitizeBody = require("../middleware/sanitizeBody")
const Course = require("../models/Course")

router.get("/", async (req, res) => {
	const courses = await Course.find().lean()
	res.json({
		data: courses.map((course) =>
			utility.formatResponseData("courses", course)
		),
	})
})

// POST
router.post("/", sanitizeMongo(), sanitizeBody, async (req, res) => {
	const newCourse = new Course(req.sanitizedBody)
	await newCourse.save()

	res.status(201).json({
		data: utility.formatResponseData("courses", newCourse),
	})
})

// GET single
router.get("/:id", async (req, res) => {
	try {
		const course = await Course.findById(req.params.id).populate('students').lean()
		if (!course) throw new error("Resource not found")
		res.json({ data: utility.formatResponseData("courses", course) })
	} catch (err) {
		utility.sendResourceNotFound(req, res, "course")
	}
})

// PATCH
router.patch("/:id", sanitizeMongo(), sanitizeBody, async (req, res) => {
	try {
		const { _id, ...otherAttributes } = req.sanitizedBody
		const course = await Course.findByIdAndUpdate(
			req.params.id,
			{ _id: req.params.id, ...otherAttributes },
			{
				new: true,
				runValidators: true,
			}
		)
		if (!course) throw new Error("Resource not found")
		res.json({ data: utility.formatResponseData("courses", course) })
	} catch (err) {
    debug(err)
		utility.sendResourceNotFound(req, res, "course")
	}
})

// PUT
router.put("/:id", sanitizeMongo(), sanitizeBody, async (req, res) => {
	try {
		const { _id, ...otherAttributes } = req.sanitizedBody
		const course = await Course.findByIdAndUpdate(
			req.params.id,
			{ _id: req.params.id, ...otherAttributes },
			{
				new: true,
        overwrite: true,
				runValidators: true,
			}
		)
		if (!course) throw new Error("Resource not found")
		res.json({ data: utility.formatResponseData("courses", course) })
	} catch (err) {
		utility.sendResourceNotFound(req, res, "course")
	}
})

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndRemove(req.params.id)
    if (!course) throw new Error('Resource not found')
    res.json({data: course})
  } catch (err) {
    debug(err)
    utility.sendResourceNotFound(req, res,"course")
  }
})

module.exports = router
