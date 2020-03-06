const mongoose = require('mongoose')

const defenseStratSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('DefenseStrat', defenseStratSchema)