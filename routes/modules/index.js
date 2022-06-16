const express = require("express")
const router = express.Router()
const Restaurant = require("../../models/Restaurant")



router.get('/', (req, res) => {
  Restaurant.find({})
    .lean()
    .then(restaurantsData => res.render("index", { restaurantsData }))
    .catch(error => console.log(err))
})


router.get("/search", (req, res) => {
  if (!req.query.keywords) {
   return res.redirect("/")
  }

  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()


  Restaurant.find({})
    .lean()
    .then(restaurantsData => {
      const filterRestaurantsData = restaurantsData.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      res.render("index", { restaurantsData: filterRestaurantsData, keywords })
    })
    .catch(err => console.log(err))
})


router.get('/restaurants', (req, res) => {
  const sort = req.query.sort
  let sortby = null
  switch (sort) {
    case '1':
      sortby = { name: 'asc' }
      break
    case '2':
      sortby = { name: 'desc' }
      break
    case '3':
      sortby = { category: 'asc' }
      break
    case '4':
      sortby = { location: 'asc' }
      break
  }
  Restaurant.find() 
    .lean() 
    .sort(sortby)
    .then(restaurantsData => res.render('index', { restaurantsData })) 
    .catch(error => console.error(error)) 
})



module.exports = router 