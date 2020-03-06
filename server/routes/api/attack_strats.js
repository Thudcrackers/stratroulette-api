const express = require('express')
const router = express.Router()
const AttackStrat = require('../../models/attack_strat')

//Get all strats
router.get('/', async (req, res) => {
    try {
        const strats = await AttackStrat.find()
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
        const count = await AttackStrat.count()
        const random = Math.floor(Math.random() * count)
        const strat = await AttackStrat.findOne().skip(random)
        res.json(strat)
    } catch(err) {
        res.status(500).json(err.message)
    }
})

//Add new strat
router.post('/', async (req, res) => {
    const strat = new AttackStrat({
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
      strat = await AttackStrat.findById(req.params.id)
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