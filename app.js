const express = require("express")
const exphbs = require("express-handlebars")
const methodOverride = require("method-override")
const bodyParser = require("body-parser")
const session = require("express-session")
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require("./routes")

const userPassword = require('./config/passport')
require("./config/mongoose")

const app = express()
const PORT = process.env.PORT

app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride("_method"))

userPassword(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.login_error = req.flash('error')
  next()
})


app.use(routes)

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})