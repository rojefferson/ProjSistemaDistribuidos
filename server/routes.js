/* jshint esversion: 6, asi: true */
const express     = require('express')
const router      = express.Router()
const Controllers = require('./controllers')

router.get('/', Controllers.index)

router.post('/tick', Controllers.tick)

module.exports = router

