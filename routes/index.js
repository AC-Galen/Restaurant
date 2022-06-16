const express = require("express")
const router = express.Router()
const index = require("./modules/index")
const restaurants = require("./modules/restaurants")
const users = require('./modules/users')


router.use('/', index)
router.use('/search', index)
router.use('/restaurants', restaurants)
router.use('/users', users)

module.exports = router
