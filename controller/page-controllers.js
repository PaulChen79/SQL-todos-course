const db = require('../models')
const bcrypt = require('bcryptjs')
const User = db.User

const pageController = {
  getLoginPage: (req, res) => {
    return res.render('login')
  },
  getRegisterPage: (req, res) => {
    return res.render('register')
  },
  register: async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body
      const user = await User.findOne({ where: { email } })
      if (user) {
        console.log("User exist")
        return res.render("register", { name, email, password, confirmPassword })
      }
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      await User.create({ name, email, password: hash })
      res.redirect("/users/login")
    } catch (error) {
      console.log(error)
    }
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  }
}

module.exports = pageController