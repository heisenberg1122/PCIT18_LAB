const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    course: {
        type: String,
        required: true,
        trim: true
    },
    year_level: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    section: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    enrolled: {
        type: Boolean,
        default: false
    }
});

//Model

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
