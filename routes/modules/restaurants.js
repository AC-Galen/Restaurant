const express = require("express")
const router = express.Router()
const Restaurant = require("../../models/Restaurant")


router.get('/new', (req, res) => {
  res.render('new')
})

router.get("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurantData => res.render("show", { restaurantData }))
    .catch(err => console.log(err))
})

router.post('/', (req, res) => {
  const restaurantData = req.body 
  restaurantData.userId = req.user._id 
  Restaurant.create(restaurantData)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.get("/:id/edit", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurantData => res.render("edit", { restaurantData }))
    .catch(err => console.log(err))
})

router.put("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const result = req.body
  Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      for (const key of Object.keys(result)) {
        restaurant[key] = result[key]
      }
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => console.log(err))
})

router.delete("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findOne({ _id, userId})
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

module.exports = router