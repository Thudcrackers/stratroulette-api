const mongoose = require('mongoose')

const attackStratSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('AttackStrat', attackStratSchema)