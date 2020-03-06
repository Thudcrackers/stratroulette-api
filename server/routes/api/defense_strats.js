const express = require('express')
const router = express.Router()
const DefenseStrat = require('../../models/defense_strat')

//Get all strats
router.get('/', async (req, res) => {
    try {
        const strats = await DefenseStrat.find()
        res.json(strats)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

//Get one strat
router.get('/getstrat/:id', getStrat, (req, res) => {
    res.json(res.strat)
})

//Get a random strat
router.get('/random', async (req, res) => {
    try {
        const count = await DefenseStrat.count()
        const random = Math.floor(Math.random() * count)
        const strat = await DefenseStrat.findOne().skip(random)
        res.json(strat)
    } catch(err) {
        res.status(500).json(err.message)
    }
})

//Add new strat
router.post('/', async (req, res) => {
    const strat = new DefenseStrat({
        title: req.body.title,
        text: req.body.text
    })

    try {
        const newStrat = await strat.save()
        res.status(201).json(newStrat)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

async function getStrat(req, res, next) {
    try {
      strat = await DefenseStrat.findById(req.params.id)
      if (strat == null) {
        return res.status(404).json({ message: 'Cant find strat'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.strat = strat
    next()
  }

module.exports = router