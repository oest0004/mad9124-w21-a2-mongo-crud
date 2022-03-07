const express = require('express')
const router = express.Router()
const utility = require("../utility")
const debug = require('debug')('A2-MONGO-CRUD:student')
const Student = require('../models/Student')


router.get('/', async (req, res) => {
  try {
    const students = await Student.find().lean()
    res.json({
      data: students.map((student) => utility.formatResponseData("students",student))
    })
	} catch (err) {
    debug(`error: ${err}`)
  }

})

router.post('/', async (req, res) => {
  try {
    
    let attributes = req.body.data
    delete attributes._id

    let newStudent = new Student(attributes)
    await newStudent.save()

    res.status(201).json({
      data: utility.formatResponseData("students", newStudent)
    })

  } catch(err) {

  }


})

router.get('/:id', async (req, res) => {
  try{

  } catch(err) {

  }
})

router.patch('/:id', async (req, res) => {
  try{

  } catch(err) {
    
  }
})

router.put('/:id', async (req, res) => {
  try{

  } catch(err) {
    
  }
})

router.delete('/:id', async (req, res) => {
  try{

  } catch(err) {
    
  }
})

module.exports = router