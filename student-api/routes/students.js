const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

//Create a student

router.post('/', async (req,res, next)=> {
    try {
        const {name, firstname, lastname, course, year_level, section, gender} = req.body;
        const student = new Student({name, firstname, lastname, course, year_level, section, gender});
        await student.save();
        res.status(201).json({
            success: true,
            message: 'Student created successfully',
            data: student
        });
    } catch (error) {
        next(error);
    }
});

//Get all students
router.get('/', async (req,res, next) => {
    try {
        const { course, year_level, gender } = req.query;
        const filter = {};

        if (course) filter.course = course;
        if (year_level) {
            const parsedYearLevel = Number(year_level);
            if (Number.isNaN(parsedYearLevel)) {
                return res.status(400).json({
                    success: false,
                    message: 'year_level must be a number'
                });
            }
            filter.year_level = parsedYearLevel;
        }
        if (gender) filter.gender = gender;

        const students = await Student.find(filter);
        res.json({
            success: true,
            message: 'Students fetched successfully',
            count: students.length,
            data: students
        });
    } catch (error) {
        next(error);
    }
});

//Update a student
router.put('/:id', async (req,res, next) => {
    try {z
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        res.json({
            success: true,
            message: 'Student updated successfully',
            data: updatedStudent
        });
    } catch (error) {
        next(error);
    }
});


//Delete a student
router.delete('/:id', async (req,res, next) => {
    try {
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deleteStudent){
            return res.status(404).json({success: false, message: 'Student not found'});
        }
        res.json({
            success: true,
            message: 'Student deleted successfully',
            data: deleteStudent
        });
    } catch (error) {
        next(error);
    }

});

module.exports = router;