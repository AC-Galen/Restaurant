const db = require("../../config/mongoose")
const Restaurant = require("../Restaurant")
const restaurantList = require("../../restaurant.json").results
const User = require('../user')

const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const SEED_USER = [
{
  email: 'user1@example.com',
  password: '12345678',
  restaurant: [restaurantList[1], restaurantList[2], restaurantList[3]]
},
  {
    email: 'user2@example.com',
    password: '12345678',
    restaurant: [restaurantList[4], restaurantList[5], restaurantList[6]]
  }
]


db.once("open", () => {
  Promise.all(Array.from(SEED_USER, userData => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(userData.password, salt))
      .then(hash => User.create({
        email: userData.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        userData.restaurant.forEach(item => {
          item.userId = userId
        })
        return Restaurant.create(userData.restaurant)
      })
  }))
  .then(() => {
    console.log('done!')
    process.exit()
  })
  .catch(err => console.log(err))
})