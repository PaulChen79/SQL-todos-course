const express = require("express")
const exphbs = require("express-handlebars")
const methodOverride = require("method-override")
const session = require("express-session")
const bcrypt = require("bcryptjs")
const usePassport = require("./config/passport")
const routes = require('./routes/index')
const PORT = 3000


const app = express()

app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }))
app.set("view engine", "hbs")
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`)
})