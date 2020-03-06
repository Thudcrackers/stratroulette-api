const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

// Middleware
app.use(cors())

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))
app.use(express.json())

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))


const attack_strats = require('./routes/api/attack_strats')
const defense_strats = require('./routes/api/defense_strats')

app.use('/api/attack_strats', attack_strats)
app.use('/api/defense_strats', defense_strats)