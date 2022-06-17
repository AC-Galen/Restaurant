const express = require("express")
const router = express.Router()
const index = require("./modules/index")
const restaurants = require("./modules/restaurants")
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')


router.use('/restaurants', authenticator, restaurants)
router.use('/search', authenticator, index)
router.use('/users', users)
router.use('/', authenticator, index)

module.exports = router
