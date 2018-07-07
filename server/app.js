/* jshint esversion: 6, asi: true */
const express      = require('express')
const app          = express()
const bodyParser   = require('body-parser')
const mongoose     = require('mongoose')
const routes       = require('./routes')
const path         = require('path')
const request      = require('request')
const config       = require('./config')
const debug        = require('debug')('server')

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

app.set('view engine', 'pug')
app.set('views','./views')

mongoose.Promise = global.Promise
mongoose.connect(config.MONGO_URL)

app.use(bodyParser.urlencoded({ extended: true, limit: '30mb'  }))
app.use(bodyParser.json({limit: '30mb'}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes)
app.listen(3000, function (err) {
  console.log('Listening on port', config.SELF_PORT)
})
